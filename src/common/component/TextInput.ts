import { Component } from "common/component/Component";
import { TagName } from "common/dom/TagName";

export class TextInput extends Component {
	readonly changedEvent = this.createDispatcher();
	readonly blurEvent = this.createDispatcher();
	readonly focusEvent = this.createDispatcher();

	constructor(placeholder?: string) {
		super({
			blockName: "text-input",
			tagName: TagName.INPUT
		});

		this.listen("change", this, (event: KeyboardEvent) => {
			this.setValue((this.element() as HTMLInputElement).value);
			this.changedEvent.dispatch(event);
		});
		this.listen("blur", this, () => this.blurEvent.dispatch());
		this.listen("focus", this, () => this.focusEvent.dispatch());

		if (placeholder) {
			this.setAttribute({name: "placeholder", value: placeholder});
		}
	}

	setValue(value: string) {
		this.setAttribute({name: "value", value});
		this.setTextContent(value);
	}

	value() {
		return this.textContent();
	}
}
