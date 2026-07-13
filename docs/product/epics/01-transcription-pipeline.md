# Epic 01: Production transcription pipeline

## Outcome

Turn every completed recording into a durable, time-aligned transcript while preserving the audio-first, privacy-conscious character of Kumbu.

## User stories

### US-01 — Automatically transcribe a recording

As a person capturing a voice note, I want transcription to begin after I stop recording so that I can read what I said without starting a separate workflow.

Acceptance criteria:

- A stopped recording creates a persisted transcription job linked to the note.
- The note exposes `queued`, `processing`, `complete`, and `failed` states.
- Closing or restarting the app does not lose the job state.
- Completion stores timestamped transcript segments on the note.
- Failure presents a retry action and retains the original audio.

### US-02 — See transcription progress

As a user waiting for a transcript, I want clear progress feedback so that I know whether processing is active or stalled.

Acceptance criteria:

- Playback and transcript screens show the current processing state.
- Long-running jobs continue safely when the app backgrounds where the platform permits.
- Reopening the app refreshes stale job state.
- Errors are actionable and do not block audio playback.

### US-03 — Choose language or automatic detection

As a multilingual user, I want to select a transcription language or automatic detection so that recognition is optimized for my recording.

Acceptance criteria:

- English, Japanese, and automatic detection settings are passed to the transcription provider.
- The detected language is stored with the transcript.
- Unsupported language responses have a clear fallback message.
- Changing the default affects new jobs without silently rewriting existing transcripts.

### US-04 — Retry or regenerate a transcript

As a user with an inaccurate or failed transcript, I want to retranscribe the original audio so that I can recover without recording again.

Acceptance criteria:

- A user can explicitly retry failed jobs and regenerate completed transcripts.
- Regeneration asks for confirmation before replacing edited transcript data.
- The operation is idempotent and cannot create duplicate active jobs.
- Previous transcript data remains available until the replacement succeeds.

### US-05 — Protect recordings and credentials

As a privacy-conscious user, I want transcription data handled safely so that my recordings are not exposed accidentally.

Acceptance criteria:

- Provider credentials are never embedded in the mobile bundle.
- Upload transport is encrypted and temporary server artifacts have a documented retention policy.
- Logs exclude transcript text, audio contents, credentials, and signed URLs.
- The UI discloses when audio leaves the device and requires consent before first use.

## Engineering slices

1. Extend note types and persistence with transcript-job state.
2. Define a provider-neutral transcription service contract.
3. Add a secure backend/upload boundary and status polling or push updates.
4. Connect recording completion to job creation.
5. Replace sample transcript fallback with loading, empty, failure, and completed states.
6. Add retry, cancellation, language selection, telemetry, and cleanup.

## Test expectations

- Unit tests for state transitions, serialization, retries, and language mapping.
- Contract tests for provider responses and malformed segments.
- Integration test from recorded file to persisted transcript.
- Android and iOS tests for backgrounding, process restart, offline recovery, and denied network access.
- Security test confirming no provider secret is present in built artifacts.

## Dependencies and non-goals

- Requires a product decision on local versus hosted transcription and its retention policy.
- Speaker diarization and transcript editing are handled in Epic 04.
- Summaries, titles, tags, and action items are handled in Epic 02.

## Definition of done

A real recording can be transcribed on both platforms, survives restart, displays time-aligned text, handles failure without losing audio, and contains no sample transcript in the production path.
