export type TextContent = {
  type: "text";
  text: string;
};

export type ImageContent = {
  type: "image";
  data: string;
  mimeType: string;
};

export type AgentToolResult<T> = {
  ok: boolean;
  result?: T;
  error?: string;
  content: (TextContent | ImageContent)[];
  details: Record<string, unknown>;
};

export type Tool = {
  name: string;
  label: string;
  description: string;
  parameters: Record<string, unknown>;
  execute: (args?: unknown) => Promise<AgentToolResult<unknown>>;
};

export function createNodesTool(_options?: {
  agentSessionKey?: string;
  config?: unknown;
}): Tool {
  return {
    name: "nodes",
    label: "Nodes",
    description: "Manage connected nodes",
    parameters: {
      type: "object",
      properties: {},
    },
    execute: async () => {
      return { 
        ok: true, 
        result: { nodes: [] }, 
        content: [{ type: "text", text: "Nodes listed" }], 
        details: {} 
      };
    },
  };
}
