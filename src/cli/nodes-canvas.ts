export function canvasSnapshotTempPath(opts?: { ext?: string }): string {
  const ext = opts?.ext || "png";
  return `/tmp/canvas-snapshot-${Date.now()}.${ext}`;
}

export function parseCanvasSnapshotPayload(data: unknown): { base64: string; format: string } {
  if (!data || typeof data !== "object") {
    return { base64: "", format: "png" };
  }
  const obj = data as Record<string, unknown>;
  if (typeof obj.base64 === "string" && typeof obj.format === "string") {
    return { base64: obj.base64, format: obj.format };
  }
  return { base64: "", format: "png" };
}
