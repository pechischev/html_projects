import { IDispatcher } from "common/event/IDispatcher";
import { Coordinate } from "common/math/Coordinate";
import { Size } from "common/math/Size";
import * as Konva from "konva";

export interface IShape<T extends Konva.Node = Konva.Node> {
	updateEvent: IDispatcher;

	setSelected(selected: boolean);

	selected(): boolean;

	setSize(size: Size);

	size(): Size;

	setPosition(pos: Coordinate);

	position(): Coordinate;

	shape(): T;

	setVisible(visible: boolean);

	visible(): boolean;

}