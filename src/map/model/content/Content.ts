import { Disposable } from "common/component/Disposable";
import { IContent } from "./IContent";

export class Content extends Disposable implements IContent {
	readonly changedTitle = this.createDispatcher();

	private _title = "";

	setTitle(title: string) {
		if (this._title == title) {
			return;
		}
		this._title = title;
		this.changedTitle.dispatch();
	}

	title(): string {
		return this._title;
	}
}
