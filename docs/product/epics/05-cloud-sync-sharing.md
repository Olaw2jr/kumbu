# Epic 05: Accounts, cloud synchronization, and sharing

## Outcome

Give users an optional, trustworthy way to access their library across devices and share selected notes without turning private recordings into public-by-default content.

## User stories

### US-01 — Create and access an account

As a user who wants synchronization, I want a secure account so that my library can be associated with me across devices.

Acceptance criteria:

- Supported sign-in methods and account-recovery behavior are documented.
- Local-only use remains possible unless product strategy explicitly changes.
- Authentication tokens use platform-secure storage and can be revoked.
- Signing out explains which local data remains on the device.

### US-02 — Synchronize notes across devices

As a user with multiple devices, I want notes and metadata synchronized so that my library remains current everywhere.

Acceptance criteria:

- Notes, transcripts, summaries, tags, folders, settings, and edit revisions have defined sync behavior.
- Sync is resumable, idempotent, and tolerant of temporary network loss.
- Users can see last-sync time and actionable failures.
- A new device can restore the canonical library without duplicate records.

### US-03 — Synchronize audio efficiently

As a user with large recordings, I want media synchronized predictably so that cloud access does not waste storage or bandwidth.

Acceptance criteria:

- Upload and download progress, pause, retry, and cancellation are visible.
- Wi-Fi-only and on-demand download preferences are available.
- Partial transfers resume safely and verify integrity before activation.
- Local eviction never deletes the cloud copy without explicit deletion.

### US-04 — Resolve concurrent edits

As a user editing on multiple devices, I want conflicts handled safely so that neither version disappears silently.

Acceptance criteria:

- Conflict rules are defined per data type rather than using one blanket last-write-wins rule.
- Destructive conflicts preserve both recoverable versions.
- The UI asks for user resolution when automatic merging is unsafe.
- Conflict handling is deterministic and covered by offline/concurrent tests.

### US-05 — Share a note with controlled access

As a user, I want to share a selected note with specific permissions so that another person can review it without accessing my library.

Acceptance criteria:

- Sharing is off by default and scoped to an explicit note.
- Owners can choose viewer or collaborator access where supported.
- Shared access can expire or be revoked immediately.
- Recipients see whether audio, transcript, summary, and comments are included.
- Unauthenticated public links require an explicit warning and confirmation.

### US-06 — Collaborate on a shared note

As a collaborator, I want to comment and suggest transcript corrections so that review can happen in context.

Acceptance criteria:

- Comments can reference a transcript segment or timestamp.
- Permissions determine who can comment, edit, download, or reshare.
- Activity identifies the actor and change without exposing unrelated account data.
- Owners can remove collaborators and resolve comments.

### US-07 — Delete or export my cloud data

As an account owner, I want to export and delete cloud-held data so that I retain control of my information.

Acceptance criteria:

- Full account export includes documented metadata and media formats.
- Account deletion communicates retention windows and queued cleanup.
- Deleting a note propagates to devices and shared links with a recoverability policy.
- Legal/audit exceptions are explicit rather than hidden.

### US-08 — Encrypt and observe cloud operations

As a privacy-conscious user, I want meaningful protection and visibility so that “encrypted” has a precise, verifiable meaning.

Acceptance criteria:

- Threat model distinguishes transport, server-side, and end-to-end encryption.
- Key ownership, recovery, sharing, and device-revocation behavior are documented before claiming E2EE.
- Operational logs exclude audio and transcript contents.
- Security events such as new sign-in, link creation, and bulk export are visible to the owner.

## Engineering slices

1. Define identity, tenancy, canonical IDs, threat model, and data-retention policy.
2. Implement optional account lifecycle and secure sessions.
3. Add metadata sync, checkpointing, migrations, and conflict handling.
4. Add resumable encrypted media transfer and cache controls.
5. Add scoped sharing, permissions, revocation, and recipient views.
6. Add comments/activity, account export/deletion, security events, and observability.

## Test expectations

- Authentication, token revocation, account recovery, and authorization tests.
- Offline, retry, duplicate-delivery, migration, and multi-device conflict simulations.
- Media integrity, interruption, quota, and low-storage tests.
- Permission-matrix tests for every shared resource operation.
- Security review of encryption claims, link entropy, logging, deletion, and tenancy isolation.

## Dependencies and non-goals

- Requires product decisions on local-only mode, hosting, regions, retention, and encryption model.
- Team channels and enterprise administration may follow after note-level sharing is reliable.
- Third-party meeting and CRM integrations belong to Epic 07.

## Definition of done

Opted-in users can restore and synchronize their complete library, resolve conflicts, share and revoke individual notes, collaborate within explicit permissions, and export or delete their cloud data under documented security guarantees.
