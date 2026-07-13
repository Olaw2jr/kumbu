# Epic 07: Calendar, meeting assistant, and workflow integrations

## Outcome

If Kumbu deliberately expands into meetings, capture scheduled conversations with explicit consent and turn verified outcomes into controlled follow-up workflows.

## Product gate

This epic changes Kumbu from a private voice-memory tool toward a meeting platform. Implementation should not begin until product leadership validates the target customer, bot-versus-botless approach, consent model, operating cost, platform policies, and effect on Kumbu's brand.

## User stories

### US-01 — Connect a calendar selectively

As a user who wants meeting capture, I want to connect a calendar with narrow permissions so that Kumbu can show eligible meetings without reading unrelated data.

Acceptance criteria:

- Google and/or Microsoft scope is selected explicitly per approved product phase.
- Requested OAuth scopes are documented and minimized.
- Events with supported meeting links are identified without auto-joining by default.
- Users can disconnect a calendar and remove stored synchronization data.
- Multiple calendars and duplicate events have deterministic behavior.

### US-02 — Choose which meetings are captured

As a user, I want per-meeting and default capture controls so that an assistant never joins unexpectedly.

Acceptance criteria:

- Auto-join is off by default for new accounts.
- Each eligible event shows capture status, sharing behavior, and a clear override.
- External, internal, recurring, and organizer-owned meetings can have separate defaults.
- Last-minute event changes are synchronized before join time.

### US-03 — Add Kumbu to an ad-hoc meeting

As a user in an unscheduled call, I want to provide a supported meeting URL so that I can request capture intentionally.

Acceptance criteria:

- Supported Zoom, Google Meet, and Microsoft Teams URL patterns are validated.
- Password-bearing links and sensitive URL data are protected from logs.
- Join progress and host-admission requirements are visible.
- Invalid, expired, or policy-blocked links produce actionable errors.

### US-04 — Notify participants and capture consent

As a meeting participant, I want clear disclosure and stop controls so that recording is not hidden or difficult to end.

Acceptance criteria:

- The assistant has an unambiguous participant name and posts a recording notice.
- Consent behavior is configurable only within legal/platform constraints and documented by region.
- Hosts and authorized participants can stop capture immediately.
- Audio, transcript, and generated content follow explicit retention and sharing settings.
- Kumbu records consent events without storing unnecessary participant data.

### US-05 — Follow a live transcript and summary

As a participant, I want a live transcript and evolving summary so that I can recover context during the meeting.

Acceptance criteria:

- Transcript segments appear with latency and availability targets defined by the chosen architecture.
- Speaker attribution includes uncertainty and correction paths.
- A live summary distinguishes provisional from finalized content.
- Connectivity loss, assistant removal, and partial meetings are represented accurately.

### US-06 — Capture shared visual context

As a participant reviewing a presentation, I want important shared slides linked to the transcript so that spoken references retain context.

Acceptance criteria:

- Visual capture is separately disclosed and can be disabled.
- Captured frames are deduplicated and linked to timestamps.
- Sensitive-screen and platform-policy restrictions are honored.
- Users can delete individual images independently of the transcript.

### US-07 — Produce post-meeting outcomes

As a meeting owner, I want a finalized summary, decisions, and assigned action items so that follow-up is ready after the call.

Acceptance criteria:

- Processing state and finalization are visible after the meeting ends.
- Decisions and tasks link to supporting transcript evidence.
- Assignees and due dates require confirmation when confidence is low.
- Owners can edit outcomes before sharing them.
- Distribution follows the meeting's explicit sharing policy.

### US-08 — Send approved actions to work tools

As a user coordinating work, I want to send confirmed outcomes to selected tools so that follow-up does not require manual duplication.

Acceptance criteria:

- Initial integrations are selected from validated demand, such as email, calendar, Slack, Notion, Jira, or a CRM.
- No external write occurs without preview and explicit confirmation.
- Created records retain a link to the source meeting where permissions allow.
- Integration failures are retryable and cannot create silent duplicates.
- Revoking an integration stops future access without deleting unrelated third-party data.

### US-09 — Manage meeting templates

As a recurring meeting owner, I want templates for expected outputs so that interviews, standups, and retrospectives produce appropriate notes.

Acceptance criteria:

- Templates define output sections, questions, and extraction targets without altering the source transcript.
- A default can be selected per recurring meeting and overridden per occurrence.
- Template changes are versioned for reproducibility.
- Built-in and user-created templates are clearly distinguished.

### US-10 — Administer meeting capture safely

As a workspace administrator, I want policy and audit controls so that meeting capture follows organizational requirements.

Acceptance criteria:

- Admins can control approved integrations, retention, external sharing, and auto-join defaults.
- Audit events cover joins, stops, shares, exports, integration writes, and deletion.
- Workspace policy cannot silently broaden an individual's private-note visibility.
- Data residency, access roles, and support escalation paths are documented before enterprise release.

### US-11 — Use a public integration boundary

As an authorized developer, I want stable APIs and webhooks so that meeting outcomes can participate in custom workflows.

Acceptance criteria:

- API access is scoped, revocable, rate-limited, versioned, and audited.
- Read/write permissions are separate and resource-specific.
- Webhooks are signed, retryable, ordered where required, and safe against replay.
- Transcript/audio access follows the same permissions as first-party clients.
- Secrets never appear in mobile bundles or webhook payload logs.

## Engineering slices

1. Complete the product gate, legal review, platform-policy review, and architecture decision.
2. Add calendar OAuth, event normalization, scheduling, and explicit per-event controls.
3. Deliver one conferencing platform end to end before generalizing the adapter boundary.
4. Add consent, stop controls, resilient live capture, transcript, and post-meeting finalization.
5. Add visual context and confirmed workflow actions.
6. Add templates, workspace policy, audit, APIs/webhooks, and additional platforms incrementally.

## Test expectations

- OAuth-scope, token-revocation, duplicate-event, recurrence, and timezone tests.
- Join/leave/admission/failure simulations against each supported platform.
- Consent, disclosure, stop-latency, retention, and regional-policy test plans.
- Live latency, partial capture, reconnection, speaker, and visual deduplication tests.
- Idempotency and permission tests for every external write and webhook.
- Security review for meeting URLs, tokens, tenant isolation, logs, APIs, and bot control channels.

## Dependencies and non-goals

- Depends on Epics 01, 02, and 04 for transcript and meeting-note quality.
- Collaboration and workspace permissions build on Epic 05.
- AI Q&A over captured meetings builds on Epic 06.
- Supporting every conferencing, calendar, CRM, and task platform in the first release is explicitly out of scope.

## Definition of done

After passing the product gate, users can deliberately schedule or request capture on supported meetings, participants receive clear disclosure and stop controls, live and finalized notes are trustworthy, and no external action or sharing occurs without the permissions and confirmation defined here.
