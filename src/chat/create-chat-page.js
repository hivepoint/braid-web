class CreateChatPage extends Polymer.Element {
  static get is() { return "create-chat-page"; }

  onCancel() {
    $router.goto("list")
  }

  connectedCallback() {
    super.connectedCallback();
    Polymer.RenderStatus.beforeNextRender(this, () => {
      this.onInput();
    });
  }

  onInput() {
    const provider = this.$.txtProvider.value.trim();
    const name = this.$.txtChannel.value.trim();
    this.$.btnCreate.disabled = !(provider && name);
  }

  onCreate() {
    const provider = this.$.txtProvider.value.trim();
    const name = this.$.txtChannel.value.trim();
    if (provider && name) {
      $channels.register(provider, {}).then((registry) => {
        $channels.createChannel(registry.services.registrationUrl, {
          details: {
            name: name
          }
        }).then((channelInfo) => {
          $router.goto(['channel', channelInfo.channelUrl, channelInfo.registerUrl], channelInfo);
        });
      })
    }
  }
}
window.customElements.define(CreateChatPage.is, CreateChatPage);