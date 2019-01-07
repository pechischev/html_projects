import { Coordinate } from "common/math/Coordinate";
import { IDispatcher } from "common/event/IDispatcher";

export interface ILink {
	readonly changedPointEvent: IDispatcher;

	id(): string;

	source(): string;

	target(): string;

	endPoint(): Coordinate;

	startPoint(): Coordinate;
}
