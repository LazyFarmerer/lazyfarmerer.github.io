export default class Counter extends HTMLElement {
    css = `
        :host {
            display: block;
            touch-action: manipulation;
            max-width: 150px;
            background-color: white;
            border-radius: 4px;
            padding: 16px;
            border: 1px solid #dddddd;
            user-select: none;
        }

        .value {
            padding: 24px 0;
            text-align: center;
            font-family: sans-serif;
            font-size: 48px;
        }

        .buttons {
            display: flex;
            gap: 16px;
        }

        .button {
            flex-grow: 1;
            font-size: 24px;
            padding: 16px 0;
            background: #dddddd;
            color: #333333;
            cursor: pointer;
            outline: none;
            border: none;
            border-radius: 4px;
        }

        .button:active {
            background: #cccccc;
        }
    `;

    template = () => `
        <div class="value">${this.value}</div>
        <div class="buttons">
        <button type="button" class="button button--increment">+</button>
        <button type="button" class="button button--decrement">-</button>
        </div>
    `;

    constructor() {
        super();

        this.value = 0;

        this.attachShadow({ mode: "open" });
        this.render();
    }

    // 내가 만든 함수
    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css.trim()}</style>
            ${this.template().trim()}
        `;

        this.shadowRoot.querySelector(".button--increment").addEventListener("click", this.onIncrementButtonClick);
        this.shadowRoot.querySelector(".button--decrement").addEventListener("click", this.onDecrementButtonClick);
    }

    onIncrementButtonClick = () => {
        this.value++;
        this.render();
    }
    onDecrementButtonClick = () => {
        this.value = Math.max(0, this.value - 1);
        this.render();
    }

    // static get observedAttributes() {
    //     return ['attribute', "감지하고싶은 요소"]
    // }
    // attributeChangedCallback() {
    //     // (attribute 변경시 실행할 코드)
    //     this.render();
    // }
}