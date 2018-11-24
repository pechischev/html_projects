import { Component } from "common/component/Component";
import { TagName } from "common/dom/TagName";
import { IDispatcher } from "common/event/IDispatcher";

export class Button extends Component {
	private _clickEvent = this.createDispatcher();

	constructor({content}: {content?: string}) {
		super({
			blockName: "button",
			tagName: TagName.BUTTON,
			content
		});

		this.listen("click", this, () => this._clickEvent.dispatch());
	}

	clickEvent(): IDispatcher {
		return this._clickEvent;
	}
}