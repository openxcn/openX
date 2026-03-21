import type { GatewayWsClient } from "./server/ws-types.js";

export type NodeInfo = {
  nodeId: string;
  displayName?: string;
  platform?: string;
  deviceFamily?: string;
  commands?: string[];
  capabilities?: string[];
  lastSeen?: number;
};

export type NodeSession = {
  nodeId: string;
  clientId: string;
  platform?: string;
  deviceFamily?: string;
  commands?: string[];
  remoteIp?: string;
  displayName?: string;
  connectedAtMs?: number;
  caps?: string[];
};

export type InvokeParams = {
  nodeId: string;
  command: string;
  params?: unknown;
  timeoutMs?: number;
  idempotencyKey?: string;
};

export type InvokeResult = {
  ok: boolean;
  result?: unknown;
  error?: { message: string };
  payloadJSON?: string | null;
  payload?: unknown;
};

export class NodeRegistry {
  private nodes = new Map<string, NodeInfo>();
  private sessions = new Map<string, NodeSession>();

  register(client: GatewayWsClient, info?: { remoteIp?: string; bins?: string[] }): NodeSession {
    const clientData = client.connect?.client as any;
    const nodeId = clientData?.id || client.connId;
    const caps = clientData?.capabilities || [];
    const commands = clientData?.commands || [];
    const session: NodeSession = {
      nodeId,
      clientId: client.connId,
      platform: clientData?.platform,
      deviceFamily: clientData?.deviceFamily,
      commands: commands,
      displayName: clientData?.displayName,
      remoteIp: info?.remoteIp,
      connectedAtMs: Date.now(),
      caps: Array.isArray(caps) ? caps : [],
    };
    this.sessions.set(client.connId, session);
    if (nodeId) {
      this.nodes.set(nodeId, {
        nodeId,
        displayName: session.displayName,
        platform: session.platform,
        deviceFamily: session.deviceFamily,
        commands: session.commands,
        capabilities: caps,
        lastSeen: Date.now(),
      });
    }
    return session;
  }

  unregister(clientId: string): string | undefined {
    const session = this.sessions.get(clientId);
    if (session) {
      this.sessions.delete(clientId);
      return session.nodeId;
    }
    return undefined;
  }

  listConnected(): NodeSession[] {
    return Array.from(this.sessions.values());
  }

  async invoke(params: InvokeParams): Promise<InvokeResult> {
    return { ok: false, error: { message: `Node ${params.nodeId} not found or not connected` } };
  }

  sendEvent(nodeId: string, event: string, payload: unknown): void {
    console.log(`NodeRegistry.sendEvent: ${nodeId} ${event}`, payload);
  }
}
