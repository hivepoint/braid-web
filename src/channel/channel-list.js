class ChannelList extends Polymer.Element {
  static get is() { return "channel-list" };

  static get properties() {
    return {
      list: Array
    };
  }

  connectedCallback() {
    super.connectedCallback();
    Polymer.RenderStatus.beforeNextRender(this, () => {
      this.refresh();
    });
  }

  refresh() {
    $channels.listAllChannels().then((list) => {
      if (!list.length) {
        list = [
          { details: { name: "Channel one" } },
          { details: { name: "Channel two" } },
          { details: { name: "Channel three" } },
          { details: { name: "Channel four" } },
          { details: { name: "Channel five" } }
        ]
      }
      this.set("list", list);
    });
  }
}
window.customElements.define(ChannelList.is, ChannelList);