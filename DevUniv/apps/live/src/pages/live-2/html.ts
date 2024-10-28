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

const joinTT = <T>(strings: TemplateStringsArray, values: T[], f: (value: T) => string) =>
  pipe(
    zip(strings, concat(map(f, values), [''])),
    flat,
    reduce((a, b) => a + b),
  );

function upper(strings, ...values: string[]) {
  return joinTT(strings, values, (v) => v.toUpperCase());
}

interface User {
  name: string;
  age: number;
}

abstract class View<T> {
  constructor(public data: T) {}

  template(data: T) {
    console.log(1);
    console.log(this.data, data);
    return html``;
  }

  render() {
    console.log(2);
    const wrapEl = document.createElement('div');
    wrapEl.innerHTML = this.template(this.data).toHtml();
    return wrapEl.children[0];
  }
}

class UserView extends View<User[]> {
  override template(): Tmpl {
    return html`
      <div class="users">
        ${this.data.map(
          (user) => html`
            <div class="user">
              <input type="checkbox" />
              <span>${user.name}</span>
              <span>${user.age}</span>
            </div>
          `,
        )}
      </div>
    `;
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
    return joinTT(this.strings, this.values, (v) => this._escapeHtml(this._merge(v)));
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

  const users: User[] = [
    { name: '박규성', age: 25 },
    { name: '박규성', age: 20 },
    { name: '박규성', age: 22 },
    { name: '박규성', age: 23 },
  ];

  document.body.append(new UserView(users).render());
}
