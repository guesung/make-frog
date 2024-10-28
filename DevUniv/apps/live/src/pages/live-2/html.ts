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

  private _escapeHtml(value: unknown) {
    return value instanceof Tmpl ? value.toHtml() : escapeHtml(value);
  }

  toHtml() {
    return pipe(
      zip(
        this.strings,
        concat(
          map((v) => this._escapeHtml(v), this.values),
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

  const result = html`
    <ul>
      <div>
        ${html`
          <ul>
            <div></div>
          </ul>
        `}
      </div>
    </ul>
  `;
  console.log(result.toHtml());
}
