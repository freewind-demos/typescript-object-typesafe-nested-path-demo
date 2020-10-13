export type DeepPartial<T> = {[K in keyof T]?: DeepPartial<T[K]>};

export type DeepNoExcess<T, U> = {
  [K in keyof U]: K extends keyof T ? DeepNoExcess<Required<T>[K], U[K]> : never;
};

// https://stackoverflow.com/questions/61393505
export type PartOf<T, U extends DeepPartial<T> & DeepNoExcess<T, U>> = U;

export type Unpack<T, P1 extends keyof T> = NonNullable<T[P1]> extends (infer U)[]
  ? U
  : NonNullable<T[P1]>;

export type UnpackForKeyPath<T, P1 extends keyof T, P2 extends keyof Unpack<T, P1>> = NonNullable<
  T[P1]
> extends object[]
  ? Items<Unpack<T, P1>[P2]>
  : Unpack<T, P1>[P2];

export type Items<T> = T extends null | undefined ? T : T[];
