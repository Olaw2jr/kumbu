# Epic 06: AI question-and-answer across notes

## Outcome

Let users ask grounded questions about one note or their wider memory library and receive answers that are traceable to the original transcript.

## User stories

### US-01 — Ask a question about one note

As a user reviewing a note, I want to ask a natural-language question so that I can retrieve details without rereading the full transcript.

Acceptance criteria:

- Chat can be opened with the current note as explicit context.
- Answers use only accessible content associated with that note.
- Every factual answer includes links to supporting transcript segments or note sections.
- If evidence is absent, the assistant says it cannot find the answer rather than guessing.

### US-02 — Ask across selected notes

As a user connecting ideas, I want to select multiple notes, folders, tags, or a date range so that I can ask questions across a deliberate scope.

Acceptance criteria:

- The active scope is always visible and editable.
- Search/retrieval excludes notes outside the selected scope.
- Answers identify which notes support each important claim.
- Large scopes have defined limits and communicate partial processing.

### US-03 — Ask across my library

As a user with a growing archive, I want to find themes, decisions, and references across my notes so that Kumbu functions as a useful memory layer.

Acceptance criteria:

- Library retrieval covers transcript, summary, title, tags, and action items.
- Results respect deleted, local-only, and unavailable content.
- Queries such as “when did I mention…?” return dates and source links.
- The system reports retrieval or indexing failures rather than returning unsupported confidence.

### US-04 — Continue a contextual conversation

As a user refining a question, I want follow-up prompts to retain useful context so that I do not need to restate the scope each time.

Acceptance criteria:

- A chat session persists its messages, scope, and referenced sources.
- Follow-up questions can narrow or expand context explicitly.
- Starting a new chat clears conversational assumptions.
- Users can rename, delete, and resume saved chats.

### US-05 — Navigate and verify sources

As a user evaluating an answer, I want to inspect its sources so that I can distinguish recorded facts from generated interpretation.

Acceptance criteria:

- Selecting a citation opens the note at the relevant transcript timestamp or summary block.
- Sources display enough surrounding text to verify the claim.
- Missing or later-deleted sources are shown as unavailable.
- Generated synthesis and direct source excerpts are visually distinct.

### US-06 — Generate useful artifacts

As a user acting on my notes, I want to turn grounded answers into drafts, checklists, or summaries so that insights can become useful output.

Acceptance criteria:

- Supported output types are explicit and previewed before saving.
- Generated artifacts retain source references where appropriate.
- Saving creates a new user-owned object rather than silently mutating source notes.
- Copy/share uses the real generated content and native platform controls.

### US-07 — Control privacy, cost, and context

As a privacy-conscious user, I want to know what is being processed and control it so that broad library access is never implicit.

Acceptance criteria:

- First use explains remote processing, retention, and selected context.
- Users can disable library-wide chat and restrict it to explicit notes.
- The UI shows when content is local-only, uploaded, indexed, or unavailable.
- Rate, token, or plan limits are communicated before losing a response.
- Chats and derived indexes are deleted under the documented data-deletion policy.

### US-08 — Give feedback on an answer

As a user encountering an incorrect answer, I want to report why it failed so that quality can improve without exposing unrelated content.

Acceptance criteria:

- Feedback distinguishes incorrect, unsupported, incomplete, and unhelpful answers.
- Diagnostic submission is opt-in and previews included data.
- Feedback does not include full transcripts by default.
- A reported answer remains visible to the user unless they delete the chat.

## Engineering slices

1. Define chat/session/source schemas and a provider-neutral generation boundary.
2. Build a permission-aware content index and retrieval contract.
3. Deliver single-note grounded Q&A with citations.
4. Add selected-scope and library retrieval with saved conversations.
5. Add source navigation, artifact generation, feedback, quotas, and privacy controls.
6. Evaluate retrieval quality, hallucination rate, latency, cost, and deletion behavior.

## Test expectations

- Retrieval tests proving scope and authorization boundaries.
- Evaluation set covering answerable, ambiguous, conflicting, and unanswerable questions.
- Citation-validity tests linking answers to exact existing source segments.
- Conversation persistence and scope-change tests.
- Prompt-injection, malicious transcript, deletion, quota, and log-redaction tests.

## Dependencies and non-goals

- Depends on Epic 01 transcripts and benefits from Epic 03 indexing.
- Shared-library queries depend on Epic 05 permissions.
- Autonomous email, calendar, CRM, or issue-tracker actions belong to Epic 07.
- Exposing hidden chain-of-thought is not a product requirement; concise evidence and sources are.

## Definition of done

Users can ask scoped questions, receive evidence-linked answers, inspect sources, continue saved chats, create derived artifacts, and reliably receive “not found” when the library lacks support.
