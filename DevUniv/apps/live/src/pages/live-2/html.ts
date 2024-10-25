import { flat, map, pipe, reduce, zip } from '@fxts/core';
import { escapeHtml } from '../live-2 copy/helper';

function tag(strings: any, ...values: unknown[]): void {
  console.log(strings, values);
}

function* concat(...args: any[]) {
  for (const arg of args) {
    yield* arg;
  }
}

const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  // zip : 둘씩 하나의 튜플로 만들어주는 함수형 함수
  pipe(
    zip(
      strings,
      concat(
        map((v) => escapeHtml(v), values),
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  );

export function main() {
  const a: 'a' = 'a';
  const b: 'b' = 'b';
  const c: 'c' = 'c';

  const result: string = html`
    <ul>
      <li>${a}</li>
      <li>${b}</li>
      <li>${c}</li>
    </ul>
  `;
  console.log(result);
}
