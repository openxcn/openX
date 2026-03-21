import { describe, expect, it } from "vitest";

import type { openxConfig } from "../../config/config.js";
import { resolveTelegramDraftStreamingChunking } from "./draft-chunking.js";

describe("resolveTelegramDraftStreamingChunking", () => {
  it("uses smaller defaults than block streaming", () => {
    const chunking = resolveTelegramDraftStreamingChunking(undefined, "default");
    expect(chunking).toEqual({
      minChars: 200,
      maxChars: 800,
      breakPreference: "paragraph",
    });
  });

  it("clamps to telegram.textChunkLimit", () => {
    const cfg: openxConfig = {
      channels: { telegram: { allowFrom: ["*"], textChunkLimit: 150 } },
    };
    const chunking = resolveTelegramDraftStreamingChunking(cfg, "default");
    expect(chunking).toEqual({
      minChars: 150,
      maxChars: 150,
      breakPreference: "paragraph",
    });
  });

  it("supports per-account overrides", () => {
    const cfg: openxConfig = {
      channels: {
        telegram: {
          allowFrom: ["*"],
          accounts: {
            default: {
              allowFrom: ["*"],
              draftChunk: {
                minChars: 10,
                maxChars: 20,
                breakPreference: "sentence",
              },
            },
          },
        },
      },
    };
    const chunking = resolveTelegramDraftStreamingChunking(cfg, "default");
    expect(chunking).toEqual({
      minChars: 10,
      maxChars: 20,
      breakPreference: "sentence",
    });
  });
});
