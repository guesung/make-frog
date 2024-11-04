import { html, View, type Html } from 'rune-ts';

class SwitchView extends View<{ on: boolean }> {
  override template() {
    return html`
      <button class="${this.data.on ? 'on' : ''}">
        <span class="toggle"></span>
      </switch>
    `;
  }

  protected override onRender(): void {
    this.element()?.addEventListener('click', () => this.setOn(!this.data.on));
  }

  setOn(bool: boolean) {
    this.data.on = bool;
    this.element()?.classList.toggle('on');
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

class SettingPage extends View<Setting[]> {
  protected override template(): Html {
    return html`<div>
      <div class="header">
        <h2>Setting</h2>
        ${new SwitchView({ on: false })}
      </div>
      <div class="body">${this.data.map((setting) => new SettingItemView(setting))}</div>
    </div>`;
  }
}

export function main() {
  const settingList: Setting[] = [
    {
      on: true,
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
