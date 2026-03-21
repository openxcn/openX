---
summary: "CLI reference for `openx reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
---

# `openx reset`

Reset local config/state (keeps the CLI installed).

```bash
openx reset
openx reset --dry-run
openx reset --scope config+creds+sessions --yes --non-interactive
```

