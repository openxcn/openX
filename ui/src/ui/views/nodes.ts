import { html, nothing } from "lit";

import { formatAgo } from "../format";
import type { NodeInfo, NodesState } from "../controllers/nodes";
import type { DevicePairingList } from "../controllers/devices";
import type {
  ExecApprovalsFile,
  ExecApprovalsSnapshot,
} from "../controllers/exec-approvals";

export type NodesProps = NodesState & {
  devicesLoading: boolean;
  devicesError: string | null;
  devicesList: DevicePairingList | null;
  configForm: Record<string, unknown> | null;
  configLoading: boolean;
  configSaving: boolean;
  configDirty: boolean;
  configFormMode: "form" | "raw";
  execApprovalsLoading: boolean;
  execApprovalsSaving: boolean;
  execApprovalsDirty: boolean;
  execApprovalsSnapshot: ExecApprovalsSnapshot | null;
  execApprovalsForm: ExecApprovalsFile | null;
  execApprovalsSelectedAgent: string | null;
  execApprovalsTarget: "gateway" | "node";
  execApprovalsTargetNodeId: string | null;
  onRefresh: () => void;
  onDevicesRefresh: () => void;
  onDeviceApprove: (requestId: string) => void;
  onDeviceReject: (requestId: string) => void;
  onDeviceRotate: (deviceId: string, role: string, scopes: string[]) => void;
  onDeviceRevoke: (deviceId: string, role: string) => void;
  onLoadConfig: () => void;
  onLoadExecApprovals: () => void;
  onBindDefault: (nodeId: string | null) => void;
  onBindAgent: (agentIndex: number, nodeId: string | null) => void;
  onSaveBindings: () => void;
  onExecApprovalsTargetChange: (kind: "gateway" | "node", nodeId: string | null) => void;
  onExecApprovalsSelectAgent: (agentId: string | null) => void;
  onExecApprovalsPatch: (path: (string | number)[], value: unknown) => void;
  onExecApprovalsRemove: (path: (string | number)[]) => void;
  onSaveExecApprovals: () => void;
};

export function renderNodes(props: NodesProps) {
  const nodes = props.nodesList ?? [];
  return html`
    <section class="card">
      <div class="row" style="justify-content: space-between;">
        <div>
          <div class="card-title">Nodes</div>
          <div class="card-sub">Connected device nodes and their capabilities.</div>
        </div>
        <button class="btn" ?disabled=${props.nodesLoading} @click=${props.onRefresh}>
          ${props.nodesLoading ? "Loading..." : "Refresh"}
        </button>
      </div>

      ${props.nodesError
        ? html`<div class="callout danger" style="margin-top: 12px;">${props.nodesError}</div>`
        : nothing}

      <div class="table" style="margin-top: 16px;">
        <div class="table-head">
          <div>Node ID</div>
          <div>Display Name</div>
          <div>Platform</div>
          <div>Status</div>
          <div>Capabilities</div>
          <div>Last Seen</div>
        </div>
        ${nodes.length === 0
          ? html`<div class="muted">No nodes connected.</div>`
          : nodes.map((node) => renderRow(node))}
      </div>
    </section>
  `;
}

function renderRow(node: NodeInfo) {
  const lastSeen = node.lastSeenAtMs ? formatAgo(node.lastSeenAtMs) : "n/a";
  const status = node.connected ? "Connected" : "Disconnected";
  const statusClass = node.connected ? "status-ok" : "status-warn";
  const capabilities = node.capabilities?.join(", ") ?? "none";

  return html`
    <div class="table-row">
      <div class="mono">${node.nodeId}</div>
      <div>${node.displayName ?? "-"}</div>
      <div>${node.platform ?? "-"}</div>
      <div class=${statusClass}>${status}</div>
      <div class="muted">${capabilities}</div>
      <div>${lastSeen}</div>
    </div>
  `;
}
