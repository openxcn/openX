import { Type, type Static } from "@sinclair/typebox";

export const NodePairApproveParamsSchema = Type.Object({
  nodeId: Type.String(),
});
export type NodePairApproveParams = Static<typeof NodePairApproveParamsSchema>;

export const NodePairListParamsSchema = Type.Object({});
export type NodePairListParams = Static<typeof NodePairListParamsSchema>;

export const NodePairRejectParamsSchema = Type.Object({
  nodeId: Type.String(),
});
export type NodePairRejectParams = Static<typeof NodePairRejectParamsSchema>;

export const NodePairRequestParamsSchema = Type.Object({
  nodeId: Type.String(),
});
export type NodePairRequestParams = Static<typeof NodePairRequestParamsSchema>;

export const NodePairVerifyParamsSchema = Type.Object({
  nodeId: Type.String(),
  code: Type.String(),
});
export type NodePairVerifyParams = Static<typeof NodePairVerifyParamsSchema>;

export const NodeRenameParamsSchema = Type.Object({
  nodeId: Type.String(),
  displayName: Type.String(),
});
export type NodeRenameParams = Static<typeof NodeRenameParamsSchema>;

export const NodesListParamsSchema = Type.Object({});
export type NodesListParams = Static<typeof NodesListParamsSchema>;

export const NodeListParamsSchema = Type.Object({});
export type NodeListParams = Static<typeof NodeListParamsSchema>;

export const NodesListResultSchema = Type.Object({
  nodes: Type.Array(
    Type.Object({
      nodeId: Type.String(),
      displayName: Type.Optional(Type.String()),
      platform: Type.Optional(Type.String()),
      deviceFamily: Type.Optional(Type.String()),
      commands: Type.Optional(Type.Array(Type.String())),
    }),
  ),
});
export type NodesListResult = Static<typeof NodesListResultSchema>;

export const NodeDescribeParamsSchema = Type.Object({
  nodeId: Type.String(),
});
export type NodeDescribeParams = Static<typeof NodeDescribeParamsSchema>;

export const NodeEventParamsSchema = Type.Object({
  nodeId: Type.String(),
  event: Type.String(),
  payload: Type.Optional(Type.Any()),
});
export type NodeEventParams = Static<typeof NodeEventParamsSchema>;

export const NodeInvokeParamsSchema = Type.Object({
  nodeId: Type.String(),
  command: Type.String(),
  params: Type.Optional(Type.Any()),
  timeoutMs: Type.Optional(Type.Number()),
});
export type NodeInvokeParams = Static<typeof NodeInvokeParamsSchema>;

export const NodeInvokeResultParamsSchema = Type.Object({
  nodeId: Type.String(),
  command: Type.String(),
  result: Type.Optional(Type.Any()),
});
export type NodeInvokeResultParams = Static<typeof NodeInvokeResultParamsSchema>;

export const NodeInvokeRequestEventSchema = Type.Object({
  nodeId: Type.String(),
  command: Type.String(),
  params: Type.Optional(Type.Any()),
  requestId: Type.String(),
});
export type NodeInvokeRequestEvent = Static<typeof NodeInvokeRequestEventSchema>;
