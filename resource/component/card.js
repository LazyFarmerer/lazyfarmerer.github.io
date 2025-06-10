import loadComponentHTML from "./../utils/component_loader.js";

class Card extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const title = this.getAttribute('data-title') || '제목 없음';
    const desc = this.getAttribute('data-desc') || '설명 없음';
    const url = this.getAttribute('data-url') || '#';

    loadComponentHTML("/resource/component/card.html", (element) => {
      this.appendChild(element);
      this.querySelector(".card-title").textContent = title;
      this.querySelector(".card-text").textContent = desc;
      this.querySelector(".card-link").setAttribute("href", url);
      this.querySelector(".card-link").setAttribute("target", "_blank");
    })
  }
}

customElements.define("my-card", Card);