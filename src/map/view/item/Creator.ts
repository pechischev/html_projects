import { Coordinate } from "common/math/Coordinate";
import * as Konva from "konva";

const CLICKABLE_SIZE = 50;

export class Creator extends Konva.Group {
	private _rect: Konva.Rect;
	private _point: Konva.Rect;

	constructor() {
		super();

		this._rect = new Konva.Rect({
			fill: "#FFFFFF",
			stroke: "black",
			strokeWidth: 1,
		});
		this.add(this._rect);

		this._point = new Konva.Rect({
			fill: "#F0F4F7",
			cornerRadius: 50,
			width: CLICKABLE_SIZE,
			height: CLICKABLE_SIZE,
		});
		this.add(this._point);
	}

	setSize(size: { width: number, height: number }): this {
		super.setSize(size);
		this._rect.setSize(size);
		this._point.x((size.width - CLICKABLE_SIZE) / 2);
		this._point.y((size.height - CLICKABLE_SIZE) / 2);
		return this;
	}
}