export function registerNodeCli(program: any): void {
  program
    .command("node")
    .description("Manage a single node")
    .action(async () => {
      console.log("Node command not implemented");
    });
}
