import { Component } from "common/component/Component";
import { TagName } from "common/dom/TagName";

export class Button extends Component {
	readonly clickEvent = this.createDispatcher();

	constructor({content}: {content?: string}) {
		super({
			blockName: "button",
			tagName: TagName.BUTTON,
			content
		});

		this.listen("click", this, () => this.clickEvent.dispatch());
	}
}