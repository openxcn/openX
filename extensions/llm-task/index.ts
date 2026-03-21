import type { openxPluginApi } from "../../src/plugins/types.js";

import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: openxPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
