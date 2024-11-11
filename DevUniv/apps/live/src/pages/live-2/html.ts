import { flat, map, pipe, reduce, zip } from '@fxts/core';
import { escapeHtml } from '../live-2 copy/helper';
import { main2 } from './html-supply';

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
  private _element: HTMLElement | null = null;

  constructor(public users: T) {}

  get element() {
    return this._element;
  }

  template(users: T) {
    return html``;
  }

  render() {
    const wrapEl = document.createElement('div');
    wrapEl.innerHTML = this.template(this.users).toHtml();
    this._element = wrapEl.children[0] as HTMLElement;
    this.onRender();
    return this._element;
  }

  abstract onRender();
}

const userHtml = ({ name, age }: User) => html`
  <div class="user">
    <input type="checkbox" />
    <span>${name}</span>
    <span>${age}</span>
  </div>
`;

class UsersView extends View<User[]> {
  override template(): Tmpl {
    return html` <div class="users">${this.users.map((user) => userHtml(user))}</div> `;
  }
  override onRender() {
    const $button = document.createElement('button');
    $button.innerText = '클릭';
    this.element?.appendChild($button);

    const ages = [1, 2, 3, 4, 5];

    $button.addEventListener('click', () => {
      ages.forEach((age) => {
        const $user = html`
          <div class="user">
            <input type="checkbox" />
            <span>${age}</span>
          </div>
        `;
        this.element?.appendChild($user.toHtml());
      });
    });
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
  // const a: 'a' = 'a';
  // const b: 'b' = 'b';
  // const c: 'c' = 'c';

  // const result = html`<ul>
  //   <li>${a}</li>
  //   <li>${b}</li>
  //   <li>${c}</li>

  //   <div>${[a, b, c].map((v) => html`<li>${v}</li>`)}</div>

  //   <li>${html` <ul></ul>`}</li>
  // </ul>`;

  const users: User[] = [
    { name: '박규성', age: 25 },
    { name: '박규성', age: 20 },
    { name: '박규성', age: 22 },
    { name: '박규성', age: 23 },
  ];

  document.body.append(new UsersView(users).render());
  // main2();
}
