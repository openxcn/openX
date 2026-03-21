import type { GatewayRequestHandlers, RespondFn } from "./types.js";

export const nodeHandlers: GatewayRequestHandlers = {
  "node.invoke": async ({ params, respond }) => {
    respond(true, { ok: true, result: null });
  },
  "node.list": async ({ params, respond }) => {
    respond(true, { nodes: [] });
  },
  "node.describe": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
  "node.event": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
  "node.rename": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
  "node.pair.list": async ({ params, respond }) => {
    respond(true, { paired: [] });
  },
  "node.pair.request": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
  "node.pair.approve": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
  "node.pair.reject": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
  "node.pair.verify": async ({ params, respond }) => {
    respond(true, { ok: true });
  },
};
