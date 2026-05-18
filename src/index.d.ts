declare module 'uuid-nanoid' {
  export function nanoid(size?: number): string;
  export function uuidv4(): string;
  export namespace UUID {
    function v3(value: string, namespace: string): string;
    function v5(value: string, namespace: string): string;
    const NIL: string;
    function parse(uuid: string): Uint8Array;
    function stringify(bytes: Uint8Array): string;
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
  }

  const UUIDNanoID: {
    nanoid: typeof nanoid;
    uuidv4: typeof uuidv4;
    UUID: typeof UUID;
    NanoID: typeof NanoID;
  };

  export default UUIDNanoID;
}
