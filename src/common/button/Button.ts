import { Component } from "common/component/Component";
import { TagName } from "common/dom/TagName";
import { Dispatcher } from "common/event/Dispatcher";
import { IDispatcher } from "common/event/IDispatcher";

export class Button extends Component {
	private _clickEvent = new Dispatcher();

	constructor({content}: {content?: string}) {
		super({
			blockName: "button",
			tagName: TagName.BUTTON,
			content
		});

		this.listen("click", () => this._clickEvent.dispatch());
	}

	clickEvent(): IDispatcher {
		return this._clickEvent;
	}
}