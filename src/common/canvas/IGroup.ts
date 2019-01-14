import { IShape } from "common/canvas/IShape";
import * as Konva from "konva";

export interface IGroup extends IShape {
	add(shape: IShape|Konva.Node);

	pop(shape: IShape|Konva.Node);
}