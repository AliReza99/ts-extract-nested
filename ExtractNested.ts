type HasNestedObject<T> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<any>
      ? false
      : true
    : false;
}[keyof T];

type ExtractNested<T, U> = T extends object
  ? {
      [K in keyof T]: K extends keyof U
        ? T[K] extends Array<infer R>
          ? Array<ExtractNested<R, U[K]>>
          : HasNestedObject<U[K]> extends true
          ? ExtractNested<T[K], U[K]>
          : Extract<T[K], U[K]>
        : T[K];
    }
  : never;
