#!/usr/bin/env node
import { runCli, isCliMainModule } from "../dist/cli/run-main.js";

if (isCliMainModule()) {
  runCli().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
