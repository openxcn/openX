export type PairedNode = {
  nodeId: string;
  displayName?: string;
  platform?: string;
  deviceFamily?: string;
  commands?: string[];
  bins: string[];
  remoteIp?: string;
  lastConnectedAtMs?: number;
};

export type NodePairingList = {
  paired: PairedNode[];
};

export async function listNodePairing(): Promise<NodePairingList> {
  return { paired: [] };
}

export async function updatePairedNodeMetadata(
  nodeId: string,
  metadata: { bins?: string[]; lastConnectedAtMs?: number },
): Promise<void> {
  console.log(`updatePairedNodeMetadata: ${nodeId}`, metadata);
}
