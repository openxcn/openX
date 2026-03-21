---
summary: "Model authentication: OAuth, API keys, and setup-token"
read_when:
  - Debugging model auth or OAuth expiry
  - Documenting authentication or credential storage
---
# Authentication

openx supports OAuth and API keys for model providers. For Anthropic
accounts, we recommend using an **API key**. For Claude subscription access,
use the long‑lived token created by `claude setup-token`.

See [/concepts/oauth](/concepts/oauth) for the full OAuth flow and storage
layout.

## Recommended Anthropic setup (API key)

If you’re using Anthropic directly, use an API key.

1) Create an API key in the Anthropic Console.
2) Put it on the **gateway host** (the machine running `openx gateway`).

```bash
export ANTHROPIC_API_KEY="..."
openx models status
```

3) If the Gateway runs under systemd/launchd, prefer putting the key in
`~/.clawdbot/.env` so the daemon can read it:

```bash
cat >> ~/.clawdbot/.env <<'EOF'
ANTHROPIC_API_KEY=...
EOF
```

Then restart the daemon (or restart your Gateway process) and re-check:

```bash
openx models status
openx doctor
```

If you’d rather not manage env vars yourself, the onboarding wizard can store
API keys for daemon use: `openx onboard`.

See [Help](/help) for details on env inheritance (`env.shellEnv`,
`~/.clawdbot/.env`, systemd/launchd).

## Anthropic: setup-token (subscription auth)

For Anthropic, the recommended path is an **API key**. If you’re using a Claude
subscription, the setup-token flow is also supported. Run it on the **gateway host**:

```bash
claude setup-token
```

Then paste it into openx:

```bash
openx models auth setup-token --provider anthropic
```

If the token was created on another machine, paste it manually:

```bash
openx models auth paste-token --provider anthropic
```

If you see an Anthropic error like:

```
This credential is only authorized for use with Claude Code and cannot be used for other API requests.
```

…use an Anthropic API key instead.

Manual token entry (any provider; writes `auth-profiles.json` + updates config):

```bash
openx models auth paste-token --provider anthropic
openx models auth paste-token --provider openrouter
```

Automation-friendly check (exit `1` when expired/missing, `2` when expiring):

```bash
openx models status --check
```

Optional ops scripts (systemd/Termux) are documented here:
[/automation/auth-monitoring](/automation/auth-monitoring)

> `claude setup-token` requires an interactive TTY.

## Checking model auth status

```bash
openx models status
openx doctor
```

## Controlling which credential is used

### Per-session (chat command)

Use `/model <alias-or-id>@<profileId>` to pin a specific provider credential for the current session (example profile ids: `anthropic:default`, `anthropic:work`).

Use `/model` (or `/model list`) for a compact picker; use `/model status` for the full view (candidates + next auth profile, plus provider endpoint details when configured).

### Per-agent (CLI override)

Set an explicit auth profile order override for an agent (stored in that agent’s `auth-profiles.json`):

```bash
openx models auth order get --provider anthropic
openx models auth order set --provider anthropic anthropic:default
openx models auth order clear --provider anthropic
```

Use `--agent <id>` to target a specific agent; omit it to use the configured default agent.

## Troubleshooting

### “No credentials found�?
If the Anthropic token profile is missing, run `claude setup-token` on the
**gateway host**, then re-check:

```bash
openx models status
```

### Token expiring/expired

Run `openx models status` to confirm which profile is expiring. If the profile
is missing, rerun `claude setup-token` and paste the token again.

## Requirements

- Claude Max or Pro subscription (for `claude setup-token`)
- Claude Code CLI installed (`claude` command available)
