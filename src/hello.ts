import {getKeyPathBuilder} from "./builder";
import KeyPath from "./KeyPath";

type State = {
  aaa: {
    bbb?: {
      ccc: string,
      ddd: string
    }
  },
  hhh: {
    iii: string
  }[]
}

// const buildKeys = buildKeypath<State>()
// const keys = buildKeys('aaa', 'bbb', 'ccc');

const keys = getKeyPathBuilder<State>();

const bbb: KeyPath<State, string | undefined> = keys.of('aaa', 'bbb');
const iii: KeyPath<State, string | undefined> = keys.of('hhh', 'iii');

console.log(bbb);
console.log(iii);

