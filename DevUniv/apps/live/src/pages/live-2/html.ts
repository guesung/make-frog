import { flat, pipe, zip } from '@fxts/core';

function tag(strings: any, ...values: any[]): void {
  console.log(strings, values);
}

function html(strings: TemplateStringsArray, ...values: unknown[]) {
  values.push('');

  // zip : 둘씩 하나의 튜플로 만들어주는 함수형 함수
  return pipe(zip(strings, values), flat);
}

export function main() {
  const a: 'a' = 'a';
  const b: 'b' = 'b';
  const c: 'c' = 'c';

  const result: string = html`1${a}2${b}3${c}`;
  console.log([...result]);
}
