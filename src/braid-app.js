class BraidApp extends Polymer.Element {
  static get is() { return 'braid-app'; }

  onRouteChange(event) {
    console.log("Route change fired", event.detail.route);
  }
}

window.customElements.define(BraidApp.is, BraidApp);