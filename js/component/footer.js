import loadComponentHTML from "./../utils/component_loader.js";

class Footer extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    loadComponentHTML("/js/component/footer.html", (element) => {
      // this.shadowRoot.appendChild(element);
      this.appendChild(element);
    })
  }
}

customElements.define("my-footer", Footer);