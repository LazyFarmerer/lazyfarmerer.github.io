import loadComponentHTML from "./../utils/component_loader.js";

class ContentsCard extends HTMLElement {

  connectedCallback() {
    // 안보이게 하기
    this.style.visibility = "hidden"
    loadComponentHTML("/00_resource/component/contentsCard.html", (element) => {
      this.appendChild(element);

      const titleSlot = this.querySelector("[slot-title]")
      const DescSlot = this.querySelector("[slot-desc]")
      const buttonSlot = this.querySelector("[slot-button]")

      const icon = this.querySelector('[data-slot="icon"]')
      if (icon) {
        titleSlot.append(icon)
      }

      const title = this.querySelector('[data-slot="title"]')
      if (title) {
        titleSlot.append(title)
        title.textContent = " " + title.textContent
      }

      const desc = this.querySelector('[data-slot="desc"]')
      if (desc) {
        DescSlot.append(desc)
      }

      const url = this.querySelector('[data-slot="button"]')
      if (url) {
        buttonSlot.append(url)
      }

      // 끝나고 보이게 하기
      requestAnimationFrame(() => {
        this.style.visibility = "visible"
      })
    })
  }

}

customElements.define("contents-card", ContentsCard);
