import { IMapItem } from "./IMapItem";
import Utils from "common/utils/Utils";

export class MapItem implements IMapItem {
	private readonly _id;
	private _title = "";

	constructor(id?: string) {
		this._id = id || Utils.getUid();
	}

	id(): string {
		return this._id;
	}

	setTitle(title: string) {
		this._title = title;
	}

	title(): string {
		return this._title;
	}
}
