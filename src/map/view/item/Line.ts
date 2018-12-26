import { AbstractShape } from "common/canvas/Shape";
import * as Konva from "konva";

export class Line extends AbstractShape<Konva.Line> {
	constructor(path: number[]) {
		super();

		this.shape().points(path);
	}

	protected createShape(): Konva.Line {
		return new Konva.Line({
			points: [],
			stroke: "black",
		});
	}
}