import type { GatewayBrowserClient } from "../gateway";

export type NodeInfo = {
  nodeId: string;
  displayName?: string;
  platform?: string;
  connected?: boolean;
  capabilities?: string[];
  lastSeenAtMs?: number;
};

export type NodeListResponse = {
  nodes: NodeInfo[];
};

export type NodesState = {
  client: GatewayBrowserClient | null;
  connected: boolean;
  nodesLoading: boolean;
  nodesError: string | null;
  nodesList: NodeInfo[];
};

export async function loadNodes(state: NodesState, opts?: { quiet?: boolean }) {
  if (!state.client || !state.connected) return;
  if (state.nodesLoading) return;
  state.nodesLoading = true;
  if (!opts?.quiet) state.nodesError = null;
  try {
    const res = (await state.client.request("node.list", {})) as NodeListResponse | null;
    state.nodesList = Array.isArray(res?.nodes) ? res!.nodes : [];
  } catch (err) {
    if (!opts?.quiet) state.nodesError = String(err);
  } finally {
    state.nodesLoading = false;
  }
}
