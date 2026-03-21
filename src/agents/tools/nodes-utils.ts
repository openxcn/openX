export type NodeListNode = {
  nodeId: string;
  displayName?: string;
  platform?: string;
  deviceFamily?: string;
  connected?: boolean;
  capabilities?: string[];
  remoteIp?: string;
  caps?: string[];
  commands?: string[];
};

export async function listNodes(_gatewayOpts?: unknown): Promise<NodeListNode[]> {
  return [];
}

export function resolveNodeId(_gatewayOpts?: unknown, nodeId?: string, _required?: boolean): Promise<string | null> {
  return Promise.resolve(nodeId || null);
}

export function resolveNodeIdFromList(nodes: NodeListNode[], nodeIdOrLabel: string | undefined, _fuzzy?: boolean): string {
  if (!nodeIdOrLabel) {
    throw new Error("node required");
  }
  const node = nodes.find((n) => n.nodeId === nodeIdOrLabel || n.displayName === nodeIdOrLabel);
  if (!node) {
    throw new Error(`node not found: ${nodeIdOrLabel}`);
  }
  return node.nodeId;
}

export function isBrowserNode(node: NodeListNode): boolean {
  return node.capabilities?.includes("browser") ?? false;
}
