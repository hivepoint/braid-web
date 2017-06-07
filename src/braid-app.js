class BraidApp extends Polymer.Element {
  static get is() { return 'braid-app'; }

  constructor() {
    super();
    this.lastActivePage = null;
  }

  connectedCallback() {
    super.connectedCallback();
    window.$router = this.$.router;
  }

  onRouteChange(event) {
    const route = event.detail.route;
    let pageName = route.segments[0] || "home";

    // show the correct page. hide others
    const pages = this.shadowRoot.querySelectorAll(".page");
    if (pages) {
      for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
      }
    }
    let activePage = this.shadowRoot.querySelector("." + pageName);
    if (!activePage) {
      activePage = this.$.home;
      pageName = "home";
    }
    activePage.style.display = "";

    // Notify prev page it's being hidden
    if (this.lastActivePage) {
      if (this.lastActivePage != activePage) {
        if (this.lastActivePage.onDeactivate) {
          this.lastActivePage.onDeactivate();
        }
      }
    }
    this.lastActivePage = activePage;

    // import page and activate it
    const pageHref = activePage.getAttribute("data-href");
    const pageCallback = () => {
      if (activePage.onActivate) {
        activePage.onActivate(route);
      }
    };
    if (pageHref) {
      Polymer.importHref(this.resolveUrl(pageHref), pageCallback);
    } else {
      pageCallback();
    }

    // scroll to the top after every page transition
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
}

window.customElements.define(BraidApp.is, BraidApp);