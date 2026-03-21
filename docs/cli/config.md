---
summary: "CLI reference for `openx config` (get/set/unset config values)"
read_when:
  - You want to read or edit config non-interactively
---

# `openx config`

Config helpers: get/set/unset values by path. Run without a subcommand to open
the configure wizard (same as `openx configure`).

## Examples

```bash
openx config get browser.executablePath
openx config set browser.executablePath "/usr/bin/google-chrome"
openx config set agents.defaults.heartbeat.every "2h"
openx config set agents.list[0].tools.exec.node "node-id-or-name"
openx config unset tools.web.search.apiKey
```

## Paths

Paths use dot or bracket notation:

```bash
openx config get agents.defaults.workspace
openx config get agents.list[0].id
```

Use the agent list index to target a specific agent:

```bash
openx config get agents.list
openx config set agents.list[1].tools.exec.node "node-id-or-name"
```

## Values

Values are parsed as JSON5 when possible; otherwise they are treated as strings.
Use `--json` to require JSON5 parsing.

```bash
openx config set agents.defaults.heartbeat.every "0m"
openx config set gateway.port 19001 --json
openx config set channels.whatsapp.groups '["*"]' --json
```

Restart the gateway after edits.
