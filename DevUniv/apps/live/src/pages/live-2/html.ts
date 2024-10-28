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

class Tmpl {
  constructor(
    private strings: TemplateStringsArray,
    private values: unknown[],
  ) {}

  private _merge(value: unknown) {
    return Array.isArray(value) ? value.reduce((a, b) => html`${a}${b}`) : value;
  }

  private _escapeHtml(value: unknown) {
    return value instanceof Tmpl ? value.toHtml() : escapeHtml(value);
  }

  toHtml() {
    return pipe(
      zip(
        this.strings,
        concat(
          map((v) => this._escapeHtml(this._merge(v)), this.values),
          [''],
        ),
      ),
      flat,
      reduce((a, b) => a + b),
    );
  }
}

const html = (strings: TemplateStringsArray, ...values: unknown[]) => new Tmpl(strings, values);

export function main() {
  const a: 'a' = 'a';
  const b: 'b' = 'b';
  const c: 'c' = 'c';

  // result는 Tmpl 인스턴스
  const result = html`<ul>
    <li>${a}</li>
    <li>${b}</li>
    <li>${c}</li>

    <div>${[a, b, c].map((v) => html`<li>${v}</li>`)}</div>
  </ul>`;
  console.log(result.toHtml());
}
