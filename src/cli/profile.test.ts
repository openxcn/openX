import path from "node:path";
import { describe, expect, it } from "vitest";
import { formatCliCommand } from "./command-format.js";
import { applyCliProfileEnv, parseCliProfileArgs } from "./profile.js";

describe("parseCliProfileArgs", () => {
  it("leaves gateway --dev for subcommands", () => {
    const res = parseCliProfileArgs([
      "node",
      "openx",
      "gateway",
      "--dev",
      "--allow-unconfigured",
    ]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBeNull();
    expect(res.argv).toEqual(["node", "openx", "gateway", "--dev", "--allow-unconfigured"]);
  });

  it("still accepts global --dev before subcommand", () => {
    const res = parseCliProfileArgs(["node", "openx", "--dev", "gateway"]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBe("dev");
    expect(res.argv).toEqual(["node", "openx", "gateway"]);
  });

  it("parses --profile value and strips it", () => {
    const res = parseCliProfileArgs(["node", "openx", "--profile", "work", "status"]);
    if (!res.ok) throw new Error(res.error);
    expect(res.profile).toBe("work");
    expect(res.argv).toEqual(["node", "openx", "status"]);
  });

  it("rejects missing profile value", () => {
    const res = parseCliProfileArgs(["node", "openx", "--profile"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (dev first)", () => {
    const res = parseCliProfileArgs(["node", "openx", "--dev", "--profile", "work", "status"]);
    expect(res.ok).toBe(false);
  });

  it("rejects combining --dev with --profile (profile first)", () => {
    const res = parseCliProfileArgs(["node", "openx", "--profile", "work", "--dev", "status"]);
    expect(res.ok).toBe(false);
  });
});

describe("applyCliProfileEnv", () => {
  it("fills env defaults for dev profile", () => {
    const env: Record<string, string | undefined> = {};
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    const expectedStateDir = path.join("/home/peter", ".clawdbot-dev");
    expect(env.CLAWDBOT_PROFILE).toBe("dev");
    expect(env.CLAWDBOT_STATE_DIR).toBe(expectedStateDir);
    expect(env.CLAWDBOT_CONFIG_PATH).toBe(path.join(expectedStateDir, "openx.json"));
    expect(env.CLAWDBOT_GATEWAY_PORT).toBe("19001");
  });

  it("does not override explicit env values", () => {
    const env: Record<string, string | undefined> = {
      CLAWDBOT_STATE_DIR: "/custom",
      CLAWDBOT_GATEWAY_PORT: "19099",
    };
    applyCliProfileEnv({
      profile: "dev",
      env,
      homedir: () => "/home/peter",
    });
    expect(env.CLAWDBOT_STATE_DIR).toBe("/custom");
    expect(env.CLAWDBOT_GATEWAY_PORT).toBe("19099");
    expect(env.CLAWDBOT_CONFIG_PATH).toBe(path.join("/custom", "openx.json"));
  });
});

describe("formatCliCommand", () => {
  it("returns command unchanged when no profile is set", () => {
    expect(formatCliCommand("openx doctor --fix", {})).toBe("openx doctor --fix");
  });

  it("returns command unchanged when profile is default", () => {
    expect(formatCliCommand("openx doctor --fix", { CLAWDBOT_PROFILE: "default" })).toBe(
      "openx doctor --fix",
    );
  });

  it("returns command unchanged when profile is Default (case-insensitive)", () => {
    expect(formatCliCommand("openx doctor --fix", { CLAWDBOT_PROFILE: "Default" })).toBe(
      "openx doctor --fix",
    );
  });

  it("returns command unchanged when profile is invalid", () => {
    expect(formatCliCommand("openx doctor --fix", { CLAWDBOT_PROFILE: "bad profile" })).toBe(
      "openx doctor --fix",
    );
  });

  it("returns command unchanged when --profile is already present", () => {
    expect(
      formatCliCommand("openx --profile work doctor --fix", { CLAWDBOT_PROFILE: "work" }),
    ).toBe("openx --profile work doctor --fix");
  });

  it("returns command unchanged when --dev is already present", () => {
    expect(formatCliCommand("openx --dev doctor", { CLAWDBOT_PROFILE: "dev" })).toBe(
      "openx --dev doctor",
    );
  });

  it("inserts --profile flag when profile is set", () => {
    expect(formatCliCommand("openx doctor --fix", { CLAWDBOT_PROFILE: "work" })).toBe(
      "openx --profile work doctor --fix",
    );
  });

  it("trims whitespace from profile", () => {
    expect(formatCliCommand("openx doctor --fix", { CLAWDBOT_PROFILE: "  jbclawd  " })).toBe(
      "openx --profile jbclawd doctor --fix",
    );
  });

  it("handles command with no args after openx", () => {
    expect(formatCliCommand("openx", { CLAWDBOT_PROFILE: "test" })).toBe(
      "openx --profile test",
    );
  });

  it("handles pnpm wrapper", () => {
    expect(formatCliCommand("pnpm openx doctor", { CLAWDBOT_PROFILE: "work" })).toBe(
      "pnpm openx --profile work doctor",
    );
  });
});
