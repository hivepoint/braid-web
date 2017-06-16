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

    $app.setBarData({
      title: this.channelInfo.details.name,
      actions: [
        {
          icon: "braid:share",
          name: "Share channel",
          callback: () => {
            this.shareChannel();
          }
        }
      ]
    });
    
    if (this.historyCallback) {
      $channels.removeHistoryMessageListener(this.channelInfo.channelId, this.historyCallback);
      this.historyCallback = null;
    }
    if (this.messageCallback) {
      $channels.removeChannelMessageListener(this.channelInfo.channelId, this.messageCallback);
      this.messageCallback = null;
    }
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
    if (!this.channelInfo) {
      return;
    }
    this.set("items", []);

    // re-add message handlers
    if (this.historyCallback) {
      $channels.removeHistoryMessageListener(this.channelInfo.channelId, this.historyCallback);
      this.historyCallback = null;
    }
    if (this.messageCallback) {
      $channels.removeChannelMessageListener(this.channelInfo.channelId, this.messageCallback);
      this.messageCallback = null;
    }
    $channels.addChannelMessageListener(this.channelInfo.channelId, (message) => {
      this.handleChannelMessage(message);
    });
    $channels.addHistoryMessageListener(this.channelInfo.channelId, (message) => {
      if (message) {
        this.push('items', messageInfo);
      }
    });

    // load history
    $channels.getHistory( {
      channelId: this.channelInfo.channelId,
      before: (new Date()).getTime(),
      maxCount: 100
    }).then((response) => {
      console.log("Histroy received", response)
    });
  }

  onCompose(event) {
    const detail = event.detail;
    $channels.sendMessage(this.channelInfo.channelId, detail.message, detail.history, detail.priority).then((messageInfo) => {
      this.push('items', messageInfo);
    });
    this.$.compose.clear();
  }

  shareChannel() {
    const shareRequest = {
      channelId: this.channelInfo.channelId,
      details: {}
    };
    $channels.shareChannel(this.channelInfo.registerUrl, shareRequest).then((shareResponse) => {
      console.log("Share code", shareResponse.shareCodeUrl);
      window.alert(shareResponse.shareCodeUrl);
    });
  }

  handleChannelMessage(message) {
    this.push('items', message);
  }

}

window.customElements.define(ChannelPage.is, ChannelPage);