import { ILink } from "map/model/link/ILink";
import { Coordinate } from "common/math/Coordinate";

export class Link implements ILink {
	private _source: string;
	private _target: string;
	private _startPoint: Coordinate;
	private _endPoint: Coordinate;

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

	setStartPoint(point: Coordinate) {
		this._startPoint = point;
	}

	startPoint(): Coordinate {
		return this._startPoint;
	}

	setEndPoint(point: Coordinate) {
		this._endPoint = point;
	}

	endPoint(): Coordinate {
		return this._endPoint;
	}
}