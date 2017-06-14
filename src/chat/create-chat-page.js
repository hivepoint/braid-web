class CreateChatPage extends Polymer.Element {
  static get is() { return "create-chat-page"; }

  onCancel() {
    $router.goto("list")
  }
}
window.customElements.define(CreateChatPage.is, CreateChatPage);