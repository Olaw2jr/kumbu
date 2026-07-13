# Epic 02: AI summaries and structured enrichment

## Outcome

Transform completed transcripts into useful, traceable summaries, titles, tags, key points, and action items without replacing the user's original words.

## User stories

### US-01 — Generate a useful summary

As a user reviewing a voice note, I want an automatically generated summary so that I can recover its meaning quickly.

Acceptance criteria:

- A completed transcript can trigger a persisted summary job.
- Terse, brief, and detailed settings produce observably different output lengths.
- Generated content never overwrites the transcript or audio.
- Processing, failure, retry, and completion states are visible.
- Empty or insufficient transcripts produce an explanatory state rather than fabricated content.

### US-02 — Extract key points and action items

As a user capturing decisions or ideas, I want key points and tasks extracted so that important follow-up is not buried in prose.

Acceptance criteria:

- Key points and action items are stored as structured data, not only rendered Markdown.
- Each generated item references one or more source transcript segments.
- Users can edit, complete, and delete action items.
- Regeneration preserves user-edited items unless replacement is explicitly confirmed.

### US-03 — Generate titles and tags

As a user with many recordings, I want descriptive titles and tags so that notes remain recognizable and organized.

Acceptance criteria:

- Auto-title and auto-tag preferences control new enrichment jobs.
- Generated titles do not replace a user-edited title.
- Suggested tags can be accepted, removed, or renamed.
- Duplicate tags are normalized consistently.

### US-04 — Regenerate safely

As a user who dislikes an AI result, I want to regenerate all or part of it so that I can get a better representation of my note.

Acceptance criteria:

- Summary, title, tags, key points, and action items can be regenerated independently.
- The user can preview changes before replacing existing content.
- Concurrent requests are prevented or clearly queued.
- A failed replacement leaves the last successful version intact.

### US-05 — Understand provenance and AI limits

As a user relying on generated notes, I want to see where claims came from so that I can verify important details.

Acceptance criteria:

- Generated key points and tasks link back to transcript timestamps.
- AI-generated content is visually distinguished from user-authored content.
- The interface warns that generated content may contain errors.
- Model/provider metadata and generation time are stored for debugging without exposing prompts or note content in logs.

### US-06 — Control AI processing and retention

As a privacy-conscious user, I want explicit AI controls so that processing follows my preferences.

Acceptance criteria:

- AI enrichment can be disabled globally and invoked manually per note.
- First use explains what content is sent and how it is retained.
- Provider credentials remain outside the mobile application.
- Deleting a note removes its generated artifacts under the documented retention policy.

## Engineering slices

1. Introduce structured enrichment types and job state.
2. Define a provider-neutral generation contract with schema validation.
3. Implement summary generation and length controls.
4. Add source-grounded key points and action items.
5. Add title/tag suggestions with user-ownership rules.
6. Add regeneration preview, provenance UI, consent, telemetry, and deletion handling.

## Test expectations

- Schema and reducer tests for every enrichment artifact.
- Prompt/response contract tests, including malformed and empty responses.
- Tests proving user edits survive background refresh and failed regeneration.
- Integration tests for transcript-to-summary and transcript-linked tasks.
- Privacy tests for deletion, disabled processing, and log redaction.

## Dependencies and non-goals

- Depends on the production transcript from Epic 01.
- Cross-note conversational Q&A belongs to Epic 06.
- Task synchronization with external products belongs to Epic 07.

## Definition of done

Real transcripts produce editable, persisted, source-grounded enrichment; preferences are honored; failures are recoverable; and static sample summary content is no longer used in production.
