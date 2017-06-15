class ChannelPage extends Polymer.Element {
  static get is() { return 'channel-page'; }
  static get properties() {
    return {
      items: Array,
      channelInfo: {
        type: Object,
        observer: 'refreshChannel'
      }
    };
  }

  onActivate(route) {
    this._active = true;
    this.channelUrl = route.segments[1];
    this.registryUrl = route.segments[2];
    this.refresh(route.context);
  }

  onDeactivate() {
    this._active = false;
  }

  refresh(info) {
    if (info) {
      this.set("channelInfo", info);
    } else {
      $channels.getChannel(this.registryUrl, this.channelUrl).then((response) => {
        this.set("channelInfo", response);
      });
    }
  }

  refreshChannel() {
    if (!this.channelInfo) {
      return;
    }
    console.log("Channel info: ", this.channelInfo);
    $channels.connectTransport(this.channelInfo.registerUrl, this.channelInfo.transportUrl).then(() => {
      console.log("Socket connected");
    });
  }

}

window.customElements.define(ChannelPage.is, ChannelPage);