import { ILink } from "map/model/link/ILink";
import { Coordinate } from "common/math/Coordinate";
import { Disposable } from "common/component/Disposable";

export class Link extends Disposable implements ILink {
	readonly changedPointEvent = this.createDispatcher();

	private _source: string;
	private _target: string;
	private _startPoint: Coordinate;
	private _endPoint: Coordinate;

	constructor(source: string, target: string) {
		super();
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
		this.changedPointEvent.dispatch();
	}

	startPoint(): Coordinate {
		return this._startPoint;
	}

	setEndPoint(point: Coordinate) {
		this._endPoint = point;
		this.changedPointEvent.dispatch();
	}

	endPoint(): Coordinate {
		return this._endPoint;
	}
}