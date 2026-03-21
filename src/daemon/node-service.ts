import type { GatewayService } from "./service.js";

export function resolveNodeService(): GatewayService {
  return {
    label: "Node",
    loadedText: "running",
    notLoadedText: "not running",
    install: async () => {
      throw new Error("Node service install not implemented");
    },
    uninstall: async () => {
      throw new Error("Node service uninstall not implemented");
    },
    stop: async () => {
      throw new Error("Node service stop not implemented");
    },
    restart: async () => {
      throw new Error("Node service restart not implemented");
    },
    isLoaded: async () => false,
    readCommand: async () => null,
    readRuntime: async () => ({
      running: false,
      pid: undefined,
    }),
  };
}
