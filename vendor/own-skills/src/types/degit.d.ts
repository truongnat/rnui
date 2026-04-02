declare module 'degit' {
  type DegitOptions = {
    cache?: boolean;
    force?: boolean;
    verbose?: boolean;
  };

  type DegitEmitter = {
    clone: (dest: string) => Promise<void>;
  };

  export default function degit(repo: string, options?: DegitOptions): DegitEmitter;
}
