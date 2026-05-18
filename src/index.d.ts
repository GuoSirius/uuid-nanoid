declare module 'uuid-nanoid' {
  export function nanoid(size?: number): string;
  export function uuidv4(): string;
  export namespace UUID {
    function v1(options?: { node?: number[]; clockseq?: number; msecs?: number | Date; nsecs?: number }): string;
    function v1ToV6(uuid: string): string;
    function v3(value: string | Uint8Array, namespace: string): string;
    function v4(options?: { random?: number[]; rng?: () => number[] }): string;
    function v5(value: string | Uint8Array, namespace: string): string;
    function v6(options?: { node?: number[]; clockseq?: number; msecs?: number | Date; nsecs?: number }): string;
    function v6ToV1(uuid: string): string;
    function v7(options?: { msecs?: number | Date; random?: number[] }): string;
    const NIL: string;
    const MAX: string;
    function parse(uuid: string): Uint8Array;
    function stringify(bytes: Uint8Array): string;
    function validate(uuid: string): boolean;
    function version(uuid: string): number;
    namespace v3 {
      const DNS: string;
      const URL: string;
    }
    namespace v5 {
      const DNS: string;
      const URL: string;
    }
  }
  export namespace NanoID {
    function nanoid(size?: number): string;
    function customAlphabet(alphabet: string, size?: number): () => string;
  function customRandom(alphabet: string, size: number, random: () => Uint8Array): () => string;
  function random(bytes: number): Uint8Array;
  const urlAlphabet: string;
  }

  const UUIDNanoID: {
    nanoid: typeof nanoid;
    uuidv4: typeof uuidv4;
    UUID: typeof UUID;
    NanoID: typeof NanoID;
  };

  export default UUIDNanoID;
}