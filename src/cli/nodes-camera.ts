export async function captureFrameFromNodeCamera(
  _gatewayOpts: unknown,
  _nodeId: string,
  _highQuality: boolean,
): Promise<{ base64: string; format: string } | null> {
  return null;
}

export async function writeBase64ToFile(filePath: string, base64: string): Promise<void> {
  const fs = await import("fs/promises");
  const buffer = Buffer.from(base64, "base64");
  await fs.writeFile(filePath, buffer);
}
