import { Listener } from "common/event/Listener";
import { IContent } from "./IContent";

export class Content extends Listener implements IContent {
	static EVENTS = {
		changedTitle: "changedTitle"
	};

	private _title = "";

	setTitle(title: string) {
		if (this._title == title) {
			return;
		}
		this._title = title;
		this.dispatch(Content.EVENTS.changedTitle);
	}

	title(): string {
		return this._title;
	}
}
