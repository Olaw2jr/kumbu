# Epic 03: Import, export, and full-content search

## Outcome

Let users bring recordings into Kumbu, find anything they captured, and take their data out in useful, honest formats.

## User stories

### US-01 — Import an audio recording

As a user with recordings in another app, I want to import common audio formats so that Kumbu can transcribe and organize existing material.

Acceptance criteria:

- The system accepts documented M4A, MP3, WAV, AAC, and OGG inputs supported by the platform stack.
- File type, readability, duration, and size are validated before creating a note.
- Import progress, cancellation, failure, and retry are visible.
- Imported recordings enter the same transcription workflow as in-app recordings.
- Duplicate imports are detected or clearly allowed as separate copies.

### US-02 — Receive shared audio from another app

As a mobile user, I want to share a recording into Kumbu from Voice Memos or another recorder so that import fits my normal workflow.

Acceptance criteria:

- Kumbu appears in supported iOS and Android share targets.
- Incoming files are copied into app-owned storage before processing.
- The user can select a title and folder before confirming import.
- Interrupted handoff does not create an unusable note.

### US-03 — Export a note as Markdown or plain text

As a user who owns my notes, I want genuine Markdown and text exports so that I can use them outside Kumbu.

Acceptance criteria:

- Export content is generated from the selected note rather than preview placeholders.
- Users can include or exclude transcript, summary, timestamps, tags, and metadata.
- Files use sanitized, collision-safe names and correct MIME types.
- Export uses the native share sheet and reports actionable failures.

### US-04 — Export original audio and PDF

As a user archiving or sharing a note, I want the original audio and a formatted PDF so that recipients can consume the appropriate format.

Acceptance criteria:

- Audio export shares the actual recorded/imported file without silent transcoding.
- PDF output contains selected note sections with accessible text and predictable pagination.
- Missing source audio produces a clear error rather than a fake file.
- Temporary export artifacts are cleaned up after sharing.

### US-05 — Search every part of a note

As a user with many notes, I want search across titles, transcripts, summaries, tags, folders, and action items so that I can retrieve ideas by what was said.

Acceptance criteria:

- Results match all documented content fields and identify the matching field.
- Transcript results show a relevant snippet and timestamp.
- Search is case-insensitive and handles punctuation consistently.
- Results remain responsive at the agreed target library size.
- Selecting a transcript match opens the note at the matching segment.

### US-06 — Filter, sort, and preserve recent searches

As a frequent user, I want filters and recent searches so that I can narrow results quickly.

Acceptance criteria:

- Filters cover date, folder, tag, transcript status, and recording duration.
- Sorting supports relevance and newest/oldest.
- Recent searches are persisted, removable, and clearable.
- Empty and no-result states suggest a useful next action.

### US-07 — Rebuild search safely

As a user upgrading the app, I want search indexes to recover automatically so that schema changes do not make notes disappear.

Acceptance criteria:

- Index schema is versioned and can be rebuilt from canonical note data.
- Index corruption cannot delete notes or audio.
- Migration progress is observable and resumable.
- Search does not expose deleted note content after cleanup completes.

## Engineering slices

1. Introduce file validation and app-owned media storage.
2. Implement document picker and mobile share-target import.
3. Replace export previews and no-op handlers with real serializers and sharing.
4. Add PDF generation and temporary-file lifecycle management.
5. Build a versioned full-text index with snippets and deep links.
6. Add filters, sorting, recents, migration, performance measurement, and accessibility.

## Test expectations

- Fixture tests for every supported and rejected file type.
- Serializer golden tests for Markdown, text, and PDF content.
- Search relevance, normalization, filtering, deep-link, and index-rebuild tests.
- Device tests for share-in/share-out, cancellation, low storage, and missing files.
- Performance test at the agreed note/transcript corpus size.

## Dependencies and non-goals

- Imported files depend on Epic 01 for transcription.
- Direct Notion, Obsidian, or cloud-provider APIs are integrations, not required for basic system sharing.
- Video import can follow after audio import proves the storage and processing pipeline.

## Definition of done

Users can import real audio, export real note content and media, and find words inside transcripts and generated content with reliable navigation to the source.
