# Epic 04: Speaker diarization and transcript editing

## Outcome

Make multi-person recordings understandable and let users correct recognition errors without breaking timestamps, playback, or generated insights.

## User stories

### US-01 — Separate speakers automatically

As a user recording a conversation, I want transcript segments grouped by speaker so that I can follow who said what.

Acceptance criteria:

- Diarization can be enabled or disabled before transcription.
- Completed transcripts store stable speaker identifiers per segment.
- Unknown speakers receive neutral labels such as Speaker 1 rather than invented names.
- Overlapping or uncertain speech is represented without silently assigning false certainty.
- Single-speaker notes remain visually simple.

### US-02 — Name and merge speakers

As a user reviewing a conversation, I want to name or merge detected speakers so that the transcript reflects the people involved.

Acceptance criteria:

- Renaming a speaker updates all associated segments in the note.
- Two detected speakers can be merged with confirmation.
- Undo is available for the current editing session.
- Names are note-local unless the user explicitly opts into reusable speaker profiles.

### US-03 — Correct transcript text

As a user reviewing recognition mistakes, I want to edit transcript segments so that the saved record is accurate.

Acceptance criteria:

- Segment text can be edited, saved, cancelled, and restored to the last generated value.
- Edits preserve segment timestamps and speaker association.
- User-edited segments are marked as edited and never overwritten silently.
- Empty segments require deletion confirmation or validation.

### US-04 — Split and merge transcript segments

As a user correcting sentence boundaries, I want to split or merge segments so that transcript structure matches the audio.

Acceptance criteria:

- A segment can be split at a selected word/time boundary.
- Adjacent segments can be merged while preserving their total time range.
- Speaker conflicts require an explicit speaker choice.
- Playback seeking remains correct after structural edits.

### US-05 — Navigate between audio and text

As a user verifying a transcript, I want audio playback synchronized with text so that I can hear the source of any segment.

Acceptance criteria:

- Tapping a segment seeks the original audio to its start time.
- The active segment follows playback without a simulated timer.
- Scrolling can follow playback and be disabled by the user.
- Playback speed and short skip controls are available during review.

### US-06 — Preserve edits during regeneration

As a user who corrected a transcript, I want retranscription to respect my work so that AI processing cannot destroy manual corrections.

Acceptance criteria:

- Regeneration previews affected edits before replacement.
- Users can keep manual edits, replace everything, or save a copy.
- Downstream summaries are marked stale when source transcript content changes.
- Edit history records the generated and current values needed for safe recovery.

### US-07 — Find and replace repeated errors

As a user correcting names or terminology, I want scoped find-and-replace so that repeated recognition errors are fast to fix.

Acceptance criteria:

- Search highlights exact and case-insensitive matches in the current transcript.
- Replace-one and replace-all show the number of affected occurrences.
- Replacement is undoable and never changes timestamps.
- Speaker names are handled separately from transcript text.

## Engineering slices

1. Extend transcript schema with speakers, confidence, edit provenance, and revision metadata.
2. Pass diarization preferences through the transcription provider contract.
3. Render real speaker groups and synchronized playback state.
4. Add speaker naming/merging and segment text editing.
5. Add segment split/merge, find/replace, undo, and revision persistence.
6. Add stale-enrichment signaling and safe retranscription workflows.

## Test expectations

- Reducer/property tests for rename, merge, split, join, undo, and revision operations.
- Playback synchronization tests around boundaries and edited segments.
- Persistence and migration tests for pre-speaker transcripts.
- Accessibility tests for speaker labels and editing controls.
- Device tests with one speaker, many speakers, silence, overlap, and provider uncertainty.

## Dependencies and non-goals

- Depends on Epic 01's timestamped transcript and source audio.
- AI summaries may consume edited transcripts, but generation belongs to Epic 02.
- Reusable biometric voiceprints are out of scope until a separate privacy and consent review.

## Definition of done

Users can identify speakers, correct and restructure transcript text, verify edits against synchronized audio, and regenerate safely without losing manual work.
