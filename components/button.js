
import resolveHTMLImport from "../utils/resolve-html-import.js";
import styles from "./button.css?inline";

class MyButton extends HTMLElement {
	shadowRootRef;
	counter = 0;

	constructor() {
		super();
		this.shadowRootRef = this.attachShadow({ mode: "open" });
	}

	async connectedCallback() {
		const { template } = await resolveHTMLImport("button.html");
		this.shadowRootRef.appendChild(template.cloneNode(true));
		const style = document.createElement('style');
		style.innerText = styles;
		this.shadowRootRef.appendChild(style);
		
		const button = this.shadowRootRef.getElementById("counter-button");
		button.textContent = `Counter is ${this.counter}`;
		button.addEventListener("click", () => {
			this.counter++;
			button.textContent = `Counter is ${this.counter}`;
		});
	}
}

if ("customElements" in window) {
	customElements.define("my-button", MyButton);
}
