type NodeSendEventFn = (opts: { nodeId: string; event: string; payloadJSON?: string | null }) => void;

type NodeSubscription = {
  nodeId: string;
  sessionKey: string;
};

export function createNodeSubscriptionManager() {
  const subscriptions = new Map<string, Set<NodeSubscription>>();

  return {
    subscribe: (nodeId: string, sessionKey: string) => {
      if (!subscriptions.has(nodeId)) {
        subscriptions.set(nodeId, new Set());
      }
      subscriptions.get(nodeId)!.add({ nodeId, sessionKey });
    },
    unsubscribe: (nodeId: string, sessionKey: string) => {
      subscriptions.get(nodeId)?.delete({ nodeId, sessionKey });
    },
    unsubscribeAll: (nodeId: string) => {
      subscriptions.delete(nodeId);
    },
    sendToSession: (
      sessionKey: string,
      event: string,
      payload: unknown,
      nodeSendEvent: NodeSendEventFn,
    ) => {
      nodeSendEvent({
        nodeId: sessionKey,
        event,
        payloadJSON: JSON.stringify(payload),
      });
    },
    sendToAllSubscribed: (event: string, payload: unknown, nodeSendEvent: NodeSendEventFn) => {
      for (const [nodeId, subs] of subscriptions) {
        for (const _sub of subs) {
          nodeSendEvent({
            nodeId,
            event,
            payloadJSON: JSON.stringify(payload),
          });
        }
      }
    },
  };
}
