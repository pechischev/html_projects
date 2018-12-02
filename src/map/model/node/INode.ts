import { IContent } from "map/model/content/IContent";
import { Coordinate } from "common/math/Coordinate";
import { IDispatcher } from "common/event/IDispatcher";

export interface INode {
	readonly changedPositionEvent: IDispatcher;

	id(): string;

	setParent(id: string);

	parent(): string|null;

	setContent(content: IContent);

	content(): IContent|null;

	setPosition(position: Coordinate);

	position(): Coordinate;
}