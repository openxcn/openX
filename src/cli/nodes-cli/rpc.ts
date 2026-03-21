export type NodesRpcOpts = {
  nodeId?: string;
  timeout?: number | string;
};

export type ExecApprovalsCliOpts = {
  nodeId?: string;
  timeout?: number;
  json?: boolean;
};

export type GatewayRpcOpts = {
  timeout?: number | string;
  json?: boolean;
  nodeId?: string;
};

export function nodesCallOpts(_cmd?: unknown): NodesRpcOpts {
  return {};
}

export function resolveNodeId(opts?: NodesRpcOpts, raw?: string): string | null {
  return opts?.nodeId || raw || null;
}
