class ChannelListPage extends Polymer.Element {
  static get is() { return "channel-list-page"; }

  onCreate() {
    $router.goto("new-channel")
  }
}
window.customElements.define(ChannelListPage.is, ChannelListPage);