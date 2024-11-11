import { CustomEventWithDetail, html, View, type Html } from 'rune-ts';

class Toggled extends CustomEventWithDetail<{ on: boolean }> {}

class SwitchView extends View<{ on: boolean }> {
  override template() {
    return html`
      <button class="${this.data.on ? 'on' : ''}">
        <span class="toggle"></span>
      </switch>
    `;
  }

  protected override onRender(): void {
    this.addEventListener(Toggled, () => this.#toggle());
  }

  setOn(bool: boolean) {
    this.data.on = bool;
    this.element().classList.toggle('on', bool);
  }

  #toggle() {
    this.setOn(!this.data.on);
    this.dispatchEvent(Toggled, { bubbles: true, detail: this.data });
  }
}

interface Setting {
  title: string;
  on: boolean;
}

class SettingItemView extends View<Setting> {
  switchView = new SwitchView(this.data);

  override template() {
    return html`
      <div>
        <span>${this.data.title}</span>
        ${this.switchView}
      </div>
    `;
  }
}

class SettingListView extends View<Setting[]> {
  switchListView = this.data.map((setting) => new SettingItemView(setting));

  protected override template(): Html {
    return html` <div>${this.switchListView}</div> `;
  }
}

class SettingPage extends View<Setting[]> {
  #totalSwitch = new SwitchView({ on: false });
  #listView = new SettingListView(this.data);

  protected override template(): Html {
    return html`<div>
      <div class="header">
        <h2>Setting</h2>
        ${this.#totalSwitch}
      </div>
      <div class="body">${this.#listView}</div>
    </div>`;
  }

  protected override onRender(): void {
    this.#totalSwitch.addEventListener(Toggled, (event) => {
      this.#checkAll(event.detail.on);
    });
    this.#listView.addEventListener('toggled', () => {
      this.#checkAllSwitch();
    });
  }

  #checkAll(on) {
    this.#listView.switchListView.forEach((switchItemView) => switchItemView.switchView.setOn(on));
  }

  #checkAllSwitch() {
    const on = this.data.every(({ on }) => on);
    this.#totalSwitch.setOn(on);
  }
}

export function main() {
  const settingList: Setting[] = [
    {
      on: false,
      title: 'Wifi',
    },
    {
      on: false,
      title: 'Bluetooth',
    },
    {
      on: false,
      title: 'Airdrop',
    },
  ];

  const settingListView = new SettingPage(settingList).render();

  document.body.appendChild(settingListView);
}
