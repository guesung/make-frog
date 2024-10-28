// 1. 태그드 템플릿 작성하기

import { flat, map, pipe, reduce, zip } from '@fxts/core';

function* concat(...values: any[]) {
  for (const value of values) {
    yield* value;
  }
}

class HtmlMaker {
  constructor(
    private strings: TemplateStringsArray,
    private values: unknown[],
  ) {}

  private _merge(v: unknown) {
    return Array.isArray(v) ? v.reduce((prev, cur) => html`${prev}${cur}`) : v;
  }

  private _flat(v) {
    return v instanceof HtmlMaker ? v.toHtml() : v;
  }

  toHtml() {
    return pipe(
      zip(
        this.strings,
        concat(
          map((v) => this._flat(this._merge(v)), this.values),
          [''],
        ),
      ),
      flat,
      reduce((acc, curr) => acc + String(curr)),
    );
  }
}

const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  new HtmlMaker(strings, values);

interface User {
  name: string;
  age: number;
}

abstract class View<T> {
  constructor(public users: T) {}

  abstract template(users: T): HtmlMaker;

  render() {
    const wrapperElement = document.createElement('div');
    wrapperElement.innerHTML = this.template(this.users).toHtml();
    console.log(this.template(this.users));
    console.log(this.template(this.users).toHtml());
    console.log(wrapperElement);
    return wrapperElement.children[0];
  }
}

class UsersView extends View<User[]> {
  override template(users: User[]) {
    return html`<div class="users">${this.users.map((user) => html`<li>${user.name}</li>`)}</div>`;
  }
}

const users: User[] = [{ name: '박규성', age: 25 }];

export const main2 = () => {
  const a = 'a';
  const b = 'b';
  const c = 'c';

  const result = html`
    <ul>
      <li>${a}</li>
      <li>${b}</li>
      <li>${c}</li>
      ${html`
        <ul>
          <li>${a}</li>
          <li>${b}</li>
          ${[a, b, c].map((v) => html`${v}`)}
        </ul>
      `}
    </ul>
  `.toHtml();

  console.log(result);

  // const wrapperElem = document.createElement('div');
  // wrapperElem.innerHTML = result;
  // document.body.append(wrapperElem);

  document.body.append(new UsersView(users).render());

  // console.log(...result.toHtml());
};
