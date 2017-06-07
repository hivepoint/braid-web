class HomePage extends Polymer.Element {
  static get is() { return 'home-page'; }

  onCreate() {
    $router.goto("channel");
  }
}

window.customElements.define(HomePage.is, HomePage);