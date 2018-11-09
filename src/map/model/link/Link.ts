import { ILink } from "map/model/link/ILink";

export class Link implements ILink {
	private _source: string;
	private _target: string;

	constructor(source: string, target: string) {
		this._source = source;
		this._target = target;
	}

	source(): string {
		return this._source;
	}

	target(): string {
		return this._target;
	}
}