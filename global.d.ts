declare global {
  interface FormData {
    append(
      name: string,
      value: string | number | FileList | Blob | undefined,
      fileName?: string
    ): void;
    set(
      name: string,
      value: string | number | FileList | Blob | undefined,
      fileName?: string
    ): void;
  }
}

export {};
