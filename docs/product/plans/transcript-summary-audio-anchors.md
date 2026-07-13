# Transcript and summary implementation with durable audio anchors

## Decision

Implement real transcripts and summaries as a sequence of delivery pull requests under the existing product epics rather than as a replacement epic:

- PR #25 owns transcription jobs and time-aligned transcript production.
- PR #26 owns persisted, source-grounded summaries and structured enrichment.
- PR #28 owns transcript editing, synchronized playback, and regeneration safety.

This plan supplies the cross-cutting data contract those epics need. Audio time is the canonical source coordinate. An annotation must never depend only on a transcript array index, generated sentence, or summary block because each can change during regeneration or editing.

## Current findings

The current application is a convincing prototype, but it cannot safely support production transcript or summary generation yet:

- `TranscriptScreen` renders sample transcript segments whenever a note has no transcript.
- `TranscriptScreen` advances the active segment with a timer and reads text with TTS instead of following the recorded audio position.
- `SummaryScreen` renders static sample Markdown whenever a note has no summary.
- The regenerate action only replays a reveal animation.
- Recording flags are held as `number[]` in `useAudioRecorder` and are discarded when `RecordingScreen` saves the note.
- Transcript segments have time ranges but no stable identity, revision, confidence, or edit provenance.
- Summary blocks cannot cite transcript segments or audio ranges.
- Persistence has no schema version or migration boundary.

Production code must remove the sample fallbacks. Missing, queued, processing, failed, and empty content are honest product states and must render as such.

## Product invariants

1. The recorded audio is the immutable source for a note unless the user explicitly replaces it.
2. All source coordinates use integer milliseconds from the start of that audio asset.
3. A timeline annotation stores its own audio range. Transcript and summary references are supplemental, never its only anchor.
4. Transcription, retranscription, transcript editing, summary generation, and summary regeneration cannot mutate or delete audio anchors.
5. Transcript segments have stable IDs inside a transcript revision and valid, ordered audio ranges.
6. Generated summary claims cite one or more audio ranges and, when available, the transcript revision and segment IDs used to create them.
7. Editing the transcript creates a new revision and marks dependent summaries stale; it does not silently rewrite them.
8. Replacement jobs are transactional: the last successful transcript or summary remains readable until a new result validates and commits.
9. No provider secret is shipped in the mobile application, and logs exclude audio, transcript, summary, and signed URL content.

## Proposed persisted model

The exact syntax can evolve during implementation, but these relationships are required:

```ts
interface AudioAsset {
  id: string;
  uri: string;
  durationMs: number;
  createdAt: number;
}

interface AudioAnchor {
  audioAssetId: string;
  startMs: number;
  endMs: number;
}

interface TimelineAnnotation {
  id: string;
  kind: 'flag' | 'bookmark' | 'comment';
  anchor: AudioAnchor;
  text?: string;
  createdAt: number;
  updatedAt: number;
}

interface TranscriptSegment {
  id: string;
  startMs: number;
  endMs: number;
  text: string;
  speakerId?: string;
  confidence?: number;
  generatedText: string;
  editedAt?: number;
}

interface TranscriptDocument {
  id: string;
  revision: number;
  audioAssetId: string;
  language?: string;
  status: 'queued' | 'processing' | 'complete' | 'failed';
  segments: TranscriptSegment[];
  createdAt: number;
  updatedAt: number;
  errorCode?: string;
}

interface SourceReference {
  anchor: AudioAnchor;
  transcriptId: string;
  transcriptRevision: number;
  segmentIds: string[];
}

interface SummaryItem {
  id: string;
  kind: 'paragraph' | 'key_point' | 'action_item' | 'quote';
  text: string;
  sources: SourceReference[];
  userEditedAt?: number;
}

interface SummaryDocument {
  id: string;
  revision: number;
  status: 'queued' | 'processing' | 'complete' | 'failed' | 'stale';
  transcriptId: string;
  transcriptRevision: number;
  items: SummaryItem[];
  createdAt: number;
  updatedAt: number;
  errorCode?: string;
}
```

`AudioAnchor` is deliberately repeated on annotations and source references. A segment ID helps navigation, but the millisecond range remains usable when a provider returns different segmentation or an editor splits or merges text.

## User stories and acceptance criteria

### US-01 — Preserve marked moments

As a person marking a moment while recording, I want that mark saved against the audio timeline so that transcription or summary generation cannot lose it.

Acceptance criteria:

- Stopping a recording persists the audio asset, note, and all current flags together.
- Every flag stores an ID, audio asset ID, and clamped millisecond range.
- Reopening or restarting the app restores every flag at the same playback position.
- Retranscription and summary regeneration leave annotation IDs and audio ranges unchanged.

### US-02 — Read a real, time-aligned transcript

As a user, I want the transcript to come from my recording and follow playback so that the text is trustworthy and useful.

Acceptance criteria:

- A note without a transcript shows its real processing, empty, or error state and never sample prose.
- Valid provider segments are normalized, versioned, and persisted before the UI reports completion.
- Tapping a segment seeks the original audio to its `startMs`.
- The active segment is derived from the real player position, not a timer.
- Flags appear on the same timeline and remain seekable when transcript segmentation changes.

### US-03 — Read a source-grounded summary

As a user, I want each generated insight tied to the recording so that I can verify it in context.

Acceptance criteria:

- A note without a summary shows a real generation, empty, disabled, or failure state and never sample Markdown.
- Summary paragraphs, key points, actions, and quotes are persisted as structured items.
- Every factual generated item contains at least one validated source reference.
- Tapping a citation opens playback at its audio anchor and highlights the best matching transcript segment when one exists.
- Unsupported or ungrounded provider output is rejected instead of being displayed without provenance.

### US-04 — Edit or regenerate without destructive loss

As a user who corrected text or added annotations, I want regeneration to preserve my work.

Acceptance criteria:

- Transcript edits create a revision while retaining original generated text and timestamps.
- A transcript revision change marks its summary stale.
- Retranscription offers keep edits, replace after preview, or save as a copy.
- Summary regeneration preserves user-edited items unless replacement is explicitly confirmed.
- Timeline annotations are outside transcript and summary replacement operations.

## Validation rules

- `0 <= startMs <= endMs <= audio.durationMs` for every anchor and segment.
- Transcript segments are ordered by `startMs`; overlap is allowed only when the provider explicitly represents overlapping speech.
- A source reference must resolve to the same audio asset as its transcript.
- Referenced segment IDs must exist in the declared transcript revision.
- Source ranges must intersect at least one referenced segment.
- IDs are generated once and never derived from mutable text.
- Provider responses are schema-validated before persistence.
- Invalid replacement output fails the job without replacing the last successful document.

## Migration strategy

1. Add a versioned note storage envelope and migrate on read before rendering.
2. Convert `audioUri` and duration into an `AudioAsset`; preserve the original URI.
3. Assign IDs to existing persisted transcript segments without changing their millisecond ranges.
4. Mark existing summaries without source metadata as `legacy-unverified`; do not invent citations.
5. Do not create persisted data from the prototype sample transcript or summary constants.
6. Historical recording flags cannot be recovered because they were never saved. The migration must not fabricate them.
7. Keep a rollback reader for the previous schema until one stable release has successfully migrated real user data.

## Delivery sequence

### Slice 1 — Persistence and anchor foundation

- Introduce schema versioning, `AudioAsset`, `AudioAnchor`, and `TimelineAnnotation`.
- Persist recording flags atomically when recording stops.
- Add migration, validation, serialization, and reducer tests.
- Render saved flags on playback and support seek-to-annotation.

This slice is independent of a transcription provider and should land first.

### Slice 2 — Production transcription from PR #25

- Add provider-neutral job and response contracts.
- Send audio through the approved local or hosted boundary.
- Normalize and validate timestamped segments into `TranscriptDocument`.
- Replace the sample transcript fallback with queued, processing, failed, empty, and complete states.
- Add retry and restart recovery.

### Slice 3 — Real synchronized transcript playback from PR #28

- Use the shared audio player position to determine the active segment.
- Seek audio from transcript rows and annotation markers.
- Add stable segment IDs, edit provenance, revision creation, and split/merge behavior.
- Prove that transcript edits and regeneration do not change annotation anchors.

### Slice 4 — Grounded summaries from PR #26

- Generate structured summary items only after a transcript completes.
- Require provider output to include segment citations, then resolve and store canonical audio ranges.
- Replace static summary blocks and simulated regeneration with persisted job states.
- Seek audio and highlight transcript context from every source citation.

### Slice 5 — Safe regeneration and rollout

- Add stale-summary signaling and replacement previews.
- Protect user-authored edits and annotations during retries and regeneration.
- Gate provider-backed processing behind consent and a feature flag.
- Remove legacy readers only after migration telemetry and rollback testing are complete.

## Pull request boundaries

Keep delivery reviewable and reversible:

1. `feat(storage): persist audio anchors and recording annotations`
2. `feat(transcription): produce versioned time-aligned transcripts`
3. `feat(transcript): synchronize editing and playback`
4. `feat(summary): generate source-grounded structured summaries`
5. `feat(enrichment): preserve edits through regeneration`

Each implementation PR must identify the epic it advances and include tests proving the cross-cutting invariants. Provider selection, credentials, and backend deployment must not be bundled into the storage foundation PR.

## Test plan

- Unit tests for anchor clamping, segment ordering, source resolution, and revision transitions.
- Migration tests from the current `Note`, `TranscriptSegment[]`, and `SummaryBlock[]` shapes.
- Persistence test proving recording flags survive app restart.
- Property tests proving transcript split, merge, edit, and replacement never change annotations.
- Contract tests for malformed timestamps, missing citations, unknown segment IDs, and mismatched audio assets.
- Integration test from recording stop through transcript completion and persisted summary citations.
- Playback tests at exact segment boundaries and annotation positions.
- Failure tests proving offline, provider, and validation errors retain audio and the last successful content.
- Privacy tests confirming built artifacts contain no provider credentials and logs contain no user content.

## Definition of done

The prototype fallbacks are absent from production paths; a real recording can produce a persisted, time-aligned transcript and a persisted, source-grounded summary; every annotation and citation seeks the original audio correctly after restart, editing, retry, and regeneration; and no failed job destroys audio or the last valid user-visible content.
