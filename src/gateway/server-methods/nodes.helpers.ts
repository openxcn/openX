import type { RespondFn } from "./types.js";

export async function respondUnavailableOnThrow(
  respond: RespondFn,
  fn: () => Promise<void>,
): Promise<void> {
  try {
    await fn();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    respond(false, undefined, { message, code: "UNAVAILABLE" });
  }
}

export function safeParseJson(json: string | null | undefined): unknown {
  if (!json) return null;
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}
