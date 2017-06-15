class ChannelPage extends Polymer.Element {
  static get is() { return 'channel-page'; }
  static get properties() {
    return {
      items: {
        type: Array,
        value: function() { return []; }
      },
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
    this.$.composeGlass.style.opacity = 1;
    this.$.composeGlass.style.display = "";
    $channels.connectTransport(this.channelInfo.registerUrl, this.channelInfo.channelId, this.channelInfo.transportUrl).then(() => {
      $channels.joinChannel({ channelId: this.channelInfo.channelId }).then((joinResponse) => {
        this.joinData = joinResponse;
        this.$.composeGlass.style.opacity = 0;
        setTimeout(() => {
          this.$.composeGlass.style.display = "none";
        }, 300);
        this.refreshContent();
      }).catch((err) => {
        console.error(err);
      });
    });
  }

  refreshContent() {
  }

  onCompose(event) {
    const detail = event.detail;
    $channels.sendMessage(this.channelInfo.channelId, detail.message, detail.history, detail.priority).then((messageInfo) => {
      this.push('items', messageInfo);
    });
    this.$.compose.clear();
  }

}

window.customElements.define(ChannelPage.is, ChannelPage);