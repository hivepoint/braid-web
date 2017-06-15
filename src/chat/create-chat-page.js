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
    const channel = this.$.txtChannel.value.trim();
    const name = this.$.txtName.value.trim();
    this.$.btnCreate.disabled = !(provider && channel && name);
  }

  onCreate() {
    const provider = this.$.txtProvider.value.trim();
    const channel = this.$.txtChannel.value.trim();
    const name = this.$.txtName.value.trim();
    if (provider && channel && name) {
      $channels.register(provider, {}).then((registry) => {
        $channels.createChannel(registry.services.registrationUrl, {
          channelDetails: { name: channel },
          participantDetails: { name: name }
        }).then((channelInfo) => {
          $router.goto(['channel', channelInfo.channelUrl, channelInfo.registerUrl], channelInfo);
        });
      })
    }
  }
}
window.customElements.define(CreateChatPage.is, CreateChatPage);