class ChannelItem extends Polymer.Element {
  static get is() { return 'channel-item'; }
  static get properties() {
    return {
      data: Object
    };
  }
}

window.customElements.define(ChannelItem.is, ChannelItem);