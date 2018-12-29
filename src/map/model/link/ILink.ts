import { Coordinate } from "common/math/Coordinate";

export interface ILink {
	source(): string;

	target(): string;

	endPoint(): Coordinate;

	startPoint(): Coordinate;
}
