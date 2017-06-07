class ChannelPage extends Polymer.Element {
  static get is() { return 'channel-page'; }
  static get properties() {
    return {
      channelName: {
        type: String,
        value: "Channel Name"
      },
      items: Array
    };
  }

  connectedCallback() {
    super.connectedCallback();
    var items = [];
    for (var i = 0; i < 20; i++) {
      items.push({
        name: "John Johnson",
        timestamp: (new Date()).getTime(),
        data: {}
      });
    }
    this.set("items", items);
  }
}

window.customElements.define(ChannelPage.is, ChannelPage);