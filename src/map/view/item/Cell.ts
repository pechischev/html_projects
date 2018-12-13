import * as Konva from "konva";
import { AbstractShape } from "common/canvas/Shape";
import { Size } from "common/math/Size";

const CLICKABLE_SIZE = 50;

export class Cell extends AbstractShape<Konva.Group> {
	private _rect: Konva.Rect;
	private _point: Konva.Rect;

	constructor() {
		super();

		this._rect = new Konva.Rect({
			fill: "#FFFFFF",
			stroke: "black",
			strokeWidth: 1,
		});

		this._point = new Konva.Rect({
			fill: "#F0F4F7",
			cornerRadius: 50,
			width: CLICKABLE_SIZE,
			height: CLICKABLE_SIZE,
		});

		const shape = this.shape();
		shape.add(this._rect);
		shape.add(this._point);
	}

	setSize(size: Size) {
		this._rect.setSize(size);
		this._point.x((size.width - CLICKABLE_SIZE) / 2);
		this._point.y((size.height - CLICKABLE_SIZE) / 2);
		super.setSize(size);
	}

	protected createShape(): Konva.Group {
		return new Konva.Group();
	}
}