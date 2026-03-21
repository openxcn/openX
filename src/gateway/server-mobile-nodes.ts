import type { NodeRegistry } from "./node-registry.js";

export function hasConnectedMobileNode(nodeRegistry: NodeRegistry): boolean {
  const nodes = nodeRegistry.listConnected();
  return nodes.some(
    (node) =>
      node.platform === "ios" ||
      node.platform === "android" ||
      node.deviceFamily === "ios" ||
      node.deviceFamily === "android",
  );
}
