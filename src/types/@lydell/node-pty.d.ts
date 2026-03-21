declare module "@lydell/node-pty" {
  export interface IPty {
    pid: number;
    cols: number;
    rows: number;
    process: string;
    handleFlowControl: boolean;
    onData: (listener: (data: string) => void) => void;
    onExit: (listener: ({ exitCode, signal }: { exitCode: number; signal?: number }) => void) => void;
    resize: (columns: number, rows: number) => void;
    write: (data: string) => void;
    kill: (signal?: string) => void;
    pause: () => void;
    resume: () => void;
  }

  export interface IWindowsPtyForkOptions {
    name?: string;
    cols?: number;
    rows?: number;
    cwd?: string;
    env?: { [key: string]: string };
    encoding?: string;
    useConpty?: boolean;
    conptyInheritCursor?: boolean;
  }

  export interface IPtyForkOptions {
    name?: string;
    cols?: number;
    rows?: number;
    cwd?: string;
    env?: { [key: string]: string };
    encoding?: string;
  }

  export function spawn(file: string, args: string[] | string, options?: IPtyForkOptions | IWindowsPtyForkOptions): IPty;
}
