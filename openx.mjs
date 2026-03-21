#!/usr/bin/env node
import { runCli } from "./dist/cli/run-main.js";

runCli().catch((err) => {
  console.error(err);
  process.exit(1);
});
