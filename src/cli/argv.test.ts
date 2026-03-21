import { describe, expect, it } from "vitest";

import {
  buildParseArgv,
  getFlagValue,
  getCommandPath,
  getPrimaryCommand,
  getPositiveIntFlagValue,
  getVerboseFlag,
  hasHelpOrVersion,
  hasFlag,
  shouldMigrateState,
  shouldMigrateStateFromPath,
} from "./argv.js";

describe("argv helpers", () => {
  it("detects help/version flags", () => {
    expect(hasHelpOrVersion(["node", "openx", "--help"])).toBe(true);
    expect(hasHelpOrVersion(["node", "openx", "-V"])).toBe(true);
    expect(hasHelpOrVersion(["node", "openx", "status"])).toBe(false);
  });

  it("extracts command path ignoring flags and terminator", () => {
    expect(getCommandPath(["node", "openx", "status", "--json"], 2)).toEqual(["status"]);
    expect(getCommandPath(["node", "openx", "agents", "list"], 2)).toEqual(["agents", "list"]);
    expect(getCommandPath(["node", "openx", "status", "--", "ignored"], 2)).toEqual(["status"]);
  });

  it("returns primary command", () => {
    expect(getPrimaryCommand(["node", "openx", "agents", "list"])).toBe("agents");
    expect(getPrimaryCommand(["node", "openx"])).toBeNull();
  });

  it("parses boolean flags and ignores terminator", () => {
    expect(hasFlag(["node", "openx", "status", "--json"], "--json")).toBe(true);
    expect(hasFlag(["node", "openx", "--", "--json"], "--json")).toBe(false);
  });

  it("extracts flag values with equals and missing values", () => {
    expect(getFlagValue(["node", "openx", "status", "--timeout", "5000"], "--timeout")).toBe(
      "5000",
    );
    expect(getFlagValue(["node", "openx", "status", "--timeout=2500"], "--timeout")).toBe("2500");
    expect(getFlagValue(["node", "openx", "status", "--timeout"], "--timeout")).toBeNull();
    expect(getFlagValue(["node", "openx", "status", "--timeout", "--json"], "--timeout")).toBe(
      null,
    );
    expect(getFlagValue(["node", "openx", "--", "--timeout=99"], "--timeout")).toBeUndefined();
  });

  it("parses verbose flags", () => {
    expect(getVerboseFlag(["node", "openx", "status", "--verbose"])).toBe(true);
    expect(getVerboseFlag(["node", "openx", "status", "--debug"])).toBe(false);
    expect(getVerboseFlag(["node", "openx", "status", "--debug"], { includeDebug: true })).toBe(
      true,
    );
  });

  it("parses positive integer flag values", () => {
    expect(getPositiveIntFlagValue(["node", "openx", "status"], "--timeout")).toBeUndefined();
    expect(
      getPositiveIntFlagValue(["node", "openx", "status", "--timeout"], "--timeout"),
    ).toBeNull();
    expect(
      getPositiveIntFlagValue(["node", "openx", "status", "--timeout", "5000"], "--timeout"),
    ).toBe(5000);
    expect(
      getPositiveIntFlagValue(["node", "openx", "status", "--timeout", "nope"], "--timeout"),
    ).toBeUndefined();
  });

  it("builds parse argv from raw args", () => {
    const nodeArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["node", "openx", "status"],
    });
    expect(nodeArgv).toEqual(["node", "openx", "status"]);

    const versionedNodeArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["node-22", "openx", "status"],
    });
    expect(versionedNodeArgv).toEqual(["node-22", "openx", "status"]);

    const versionedNodeWindowsArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["node-22.2.0.exe", "openx", "status"],
    });
    expect(versionedNodeWindowsArgv).toEqual(["node-22.2.0.exe", "openx", "status"]);

    const versionedNodePatchlessArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["node-22.2", "openx", "status"],
    });
    expect(versionedNodePatchlessArgv).toEqual(["node-22.2", "openx", "status"]);

    const versionedNodeWindowsPatchlessArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["node-22.2.exe", "openx", "status"],
    });
    expect(versionedNodeWindowsPatchlessArgv).toEqual(["node-22.2.exe", "openx", "status"]);

    const versionedNodeWithPathArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["/usr/bin/node-22.2.0", "openx", "status"],
    });
    expect(versionedNodeWithPathArgv).toEqual(["/usr/bin/node-22.2.0", "openx", "status"]);

    const nodejsArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["nodejs", "openx", "status"],
    });
    expect(nodejsArgv).toEqual(["nodejs", "openx", "status"]);

    const nonVersionedNodeArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["node-dev", "openx", "status"],
    });
    expect(nonVersionedNodeArgv).toEqual(["node", "openx", "node-dev", "openx", "status"]);

    const directArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["openx", "status"],
    });
    expect(directArgv).toEqual(["node", "openx", "status"]);

    const bunArgv = buildParseArgv({
      programName: "openx",
      rawArgs: ["bun", "src/entry.ts", "status"],
    });
    expect(bunArgv).toEqual(["bun", "src/entry.ts", "status"]);
  });

  it("builds parse argv from fallback args", () => {
    const fallbackArgv = buildParseArgv({
      programName: "openx",
      fallbackArgv: ["status"],
    });
    expect(fallbackArgv).toEqual(["node", "openx", "status"]);
  });

  it("decides when to migrate state", () => {
    expect(shouldMigrateState(["node", "openx", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "openx", "health"])).toBe(false);
    expect(shouldMigrateState(["node", "openx", "sessions"])).toBe(false);
    expect(shouldMigrateState(["node", "openx", "memory", "status"])).toBe(false);
    expect(shouldMigrateState(["node", "openx", "agent", "--message", "hi"])).toBe(false);
    expect(shouldMigrateState(["node", "openx", "agents", "list"])).toBe(true);
    expect(shouldMigrateState(["node", "openx", "message", "send"])).toBe(true);
  });

  it("reuses command path for migrate state decisions", () => {
    expect(shouldMigrateStateFromPath(["status"])).toBe(false);
    expect(shouldMigrateStateFromPath(["agents", "list"])).toBe(true);
  });
});
