import loadComponentHTML from "../utils/component_loader.js";

class Nav extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["data-bs-theme"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "data-bs-theme") {
      return;
    }

    const theme = newValue;
    this.change_theme(theme);
  }

  connectedCallback() {
    loadComponentHTML("/js/component/nav.html", (element) => {
      this.appendChild(element)

      const theme = this.getAttribute("data-bs-theme");
      this.change_theme(theme);
    })
  }

  change_theme(theme) {
    const nav = this.querySelector("nav")
    const texts = this.querySelectorAll(".nav-link")
    if (nav == null) {
      return
    }

    // 초기화
    nav.classList.remove("bg-light", "bg-light-subtle", "bg-body-secondary")
    texts.forEach((t) => t.classList.remove("text-light", "text-dark"))

    if (theme === "dark") {
      // 다크모드: 네비게이션은 진한 회색
      nav.classList.add("bg-light-subtle")
      texts.forEach((t) => t.classList.add("text-light"))
    }
    
    if (theme === "light") {
      // 라이트모드: 너무 밝은 하양 말고 은은한 밝은 회색
      nav.classList.add("bg-body-secondary")
      texts.forEach((t) => t.classList.add("text-dark"))
    }
  }
}

customElements.define("my-nav", Nav);