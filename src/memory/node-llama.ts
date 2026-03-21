import type { Llama, LlamaLogLevel as LlamaLogLevelType } from "node-llama-cpp";

export async function importNodeLlamaCpp(): Promise<{
  getLlama: (options?: { logLevel?: LlamaLogLevelType }) => Promise<Llama>;
  resolveModelFile: (modelPath: string, cacheDir?: string) => Promise<string>;
  LlamaLogLevel: typeof LlamaLogLevelType;
}> {
  try {
    const module = await import("node-llama-cpp");
    return {
      getLlama: module.getLlama,
      resolveModelFile: module.resolveModelFile,
      LlamaLogLevel: module.LlamaLogLevel,
    };
  } catch {
    throw new Error(
      "node-llama-cpp is not installed. Install it with: npm install node-llama-cpp",
    );
  }
}
