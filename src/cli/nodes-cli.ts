export function registerNodesCli(program: any): void {
  program
    .command("nodes")
    .description("Manage connected nodes")
    .action(async () => {
      console.log("Nodes command not implemented");
    });
}
