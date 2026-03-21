---
summary: "When openx shows typing indicators and how to tune them"
read_when:
  - Changing typing indicator behavior or defaults
---
# Typing indicators

Typing indicators are sent to the chat channel while a run is active. Use
`agents.defaults.typingMode` to control **when** typing starts and `typingIntervalSeconds`
to control **how often** it refreshes.

## Defaults
When `agents.defaults.typingMode` is **unset**, openx keeps the legacy behavior:
- **Direct chats**: typing starts immediately once the model loop begins.
- **Group chats with a mention**: typing starts immediately.
- **Group chats without a mention**: typing starts only when message text begins streaming.
- **Heartbeat runs**: typing is disabled.

## Modes
Set `agents.defaults.typingMode` to one of:
- `never` â€?no typing indicator, ever.
- `instant` â€?start typing **as soon as the model loop begins**, even if the run
  later returns only the silent reply token.
- `thinking` â€?start typing on the **first reasoning delta** (requires
  `reasoningLevel: "stream"` for the run).
- `message` â€?start typing on the **first non-silent text delta** (ignores
  the `NO_REPLY` silent token).

Order of â€œhow early it firesâ€?
`never` â†?`message` â†?`thinking` â†?`instant`

## Configuration
```json5
{
  agent: {
    typingMode: "thinking",
    typingIntervalSeconds: 6
  }
}
```

You can override mode or cadence per session:
```json5
{
  session: {
    typingMode: "message",
    typingIntervalSeconds: 4
  }
}
```

## Notes
- `message` mode wonâ€™t show typing for silent-only replies (e.g. the `NO_REPLY`
  token used to suppress output).
- `thinking` only fires if the run streams reasoning (`reasoningLevel: "stream"`).
  If the model doesnâ€™t emit reasoning deltas, typing wonâ€™t start.
- Heartbeats never show typing, regardless of mode.
- `typingIntervalSeconds` controls the **refresh cadence**, not the start time.
  The default is 6 seconds.
