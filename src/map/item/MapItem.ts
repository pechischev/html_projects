import { Listener } from "common/event/Listener";
import { IMapItem } from "./IMapItem";
import { Utils } from "common/utils/Utils";

export class MapItem extends Listener implements IMapItem {
	static EVENTS = {
		changedTitle: "changedTitle"
	};

	private readonly _id;
	private _title = "";

	constructor(id?: string) {
		super();
		this._id = id || Utils.getUid(this);
	}

	id(): string {
		return this._id;
	}

	setTitle(title: string) {
		if (this._title == title) {
			return;
		}
		this._title = title;
		this.dispatch(MapItem.EVENTS.changedTitle);
	}

	title(): string {
		return this._title;
	}
}
