import type { openxConfig } from "../config/config.js";

export function resolveNodeCommandAllowlist(
  cfg: openxConfig,
  _opts?: { platform?: string; deviceFamily?: string },
): Set<string> {
  const commands = (cfg as any)?.node?.commands ?? [];
  return new Set(commands.filter((c: unknown) => typeof c === "string" && (c as string).length > 0));
}

export function isNodeCommandAllowed(opts: {
  command: string;
  allowlist: string[] | Set<string> | undefined;
  declaredCommands?: string[];
}): { ok: boolean; reason?: string } {
  const { command, allowlist, declaredCommands } = opts;
  if (!allowlist) {
    return { ok: false, reason: "No allowlist configured" };
  }
  const set = allowlist instanceof Set ? allowlist : new Set(allowlist);
  if (set.has(command)) {
    return { ok: true };
  }
  if (declaredCommands && declaredCommands.includes(command)) {
    return { ok: true };
  }
  return { ok: false, reason: `Command "${command}" not in allowlist` };
}
