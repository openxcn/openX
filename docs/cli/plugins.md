---
summary: "CLI reference for `openx plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
---

# `openx plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:
- Plugin system: [Plugins](/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
openx plugins list
openx plugins info <id>
openx plugins enable <id>
openx plugins disable <id>
openx plugins doctor
openx plugins update <id>
openx plugins update --all
```

Bundled plugins ship with openx but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `openx.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
openx plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
openx plugins install -l ./my-plugin
```

### Update

```bash
openx plugins update <id>
openx plugins update --all
openx plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
