import {Unpack, UnpackForKeyPath} from './typeUtils';
import KeyPath from './KeyPath';

interface KeyPathBuilder<T> {
  of<P1 extends keyof T>(prop1: P1): KeyPath<T, T[P1]>;

  of<P1 extends keyof T, P2 extends keyof Unpack<T, P1>>(
    prop1: P1,
    prop2: P2
  ): KeyPath<T, UnpackForKeyPath<T, P1, P2>>;

  of<P1 extends keyof T,
    P2 extends keyof Unpack<T, P1>,
    P3 extends keyof Unpack<Unpack<T, P1>, P2>>(
    prop1: P1,
    prop2: P2,
    prop3: P3
  ): KeyPath<T, Unpack<Unpack<T, P1>, P2>[P3]>;

}

class KeyPathList<T, P> implements KeyPath<T, P> {
  constructor(private nestedKeys: string[]) {
  }

  get fullKeyPath() {
    return this.nestedKeys.join('.');
  }

  get initPath() {
    return this.nestedKeys.slice(0, this.nestedKeys.length - 1).join('.');
  }

  get lastKey() {
    return this.nestedKeys[this.nestedKeys.length - 1] || '';
  }

}

/**
 * Get builder for KeyPath
 */
export function getKeyPathBuilder<T>(): KeyPathBuilder<T> {
  const registeredKeyPaths: Map<string, KeyPathList<keyof T, unknown>> = new Map();

  return {
    of(...nestedKeys: string[]) {
      const keyPath = new KeyPathList(nestedKeys);
      registeredKeyPaths.set(keyPath.fullKeyPath, keyPath);

      return keyPath;
    },
  };
}
