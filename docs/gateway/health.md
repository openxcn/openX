---
summary: "Health check steps for channel connectivity"
read_when:
  - Diagnosing WhatsApp channel health
---
# Health Checks (CLI)

Short guide to verify channel connectivity without guessing.

## Quick checks
- `openx status` â€?local summary: gateway reachability/mode, update hint, linked channel auth age, sessions + recent activity.
- `openx status --all` â€?full local diagnosis (read-only, color, safe to paste for debugging).
- `openx status --deep` â€?also probes the running Gateway (per-channel probes when supported).
- `openx health --json` â€?asks the running Gateway for a full health snapshot (WS-only; no direct Baileys socket).
- Send `/status` as a standalone message in WhatsApp/WebChat to get a status reply without invoking the agent.
- Logs: tail `/tmp/openx/openx-*.log` and filter for `web-heartbeat`, `web-reconnect`, `web-auto-reply`, `web-inbound`.

## Deep diagnostics
- Creds on disk: `ls -l ~/.clawdbot/credentials/whatsapp/<accountId>/creds.json` (mtime should be recent).
- Session store: `ls -l ~/.clawdbot/agents/<agentId>/sessions/sessions.json` (path can be overridden in config). Count and recent recipients are surfaced via `status`.
- Relink flow: `openx channels logout && openx channels login --verbose` when status codes 409â€?15 or `loggedOut` appear in logs. (Note: the QR login flow auto-restarts once for status 515 after pairing.)

## When something fails
- `logged out` or status 409â€?15 â†?relink with `openx channels logout` then `openx channels login`.
- Gateway unreachable â†?start it: `openx gateway --port 18789` (use `--force` if the port is busy).
- No inbound messages â†?confirm linked phone is online and the sender is allowed (`channels.whatsapp.allowFrom`); for group chats, ensure allowlist + mention rules match (`channels.whatsapp.groups`, `agents.list[].groupChat.mentionPatterns`).

## Dedicated "health" command
`openx health --json` asks the running Gateway for its health snapshot (no direct channel sockets from the CLI). It reports linked creds/auth age when available, per-channel probe summaries, session-store summary, and a probe duration. It exits non-zero if the Gateway is unreachable or the probe fails/timeouts. Use `--timeout <ms>` to override the 10s default.
