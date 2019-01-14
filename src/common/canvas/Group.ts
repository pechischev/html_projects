import { IGroup } from "common/canvas/IGroup";
import { AbstractShape } from "common/canvas/Shape";
import * as Konva from "konva";
import { IShape } from "common/canvas/IShape";
import { notImplement } from "common/utils/tools";

export abstract class Group extends AbstractShape<Konva.Group> implements IGroup {
	constructor(config?: Konva.ContainerConfig) {
		super(config);
	}

	add(shape: IShape|Konva.Node) {
		const item = shape instanceof Konva.Node ? shape : shape.shape();
		const group = this.shape();
		group.add(item);
	}

	pop(shape: IShape|Konva.Node) {
		notImplement();
	}

	protected createShape(config?: Konva.ContainerConfig): Konva.Group {
		return new Konva.Group(config);
	}
}