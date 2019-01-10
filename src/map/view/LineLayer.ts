import { Layer } from "common/canvas/Layer";
import * as Konva from "konva";
import { LinkLine } from "map/view/item/LinkLine";
import { Coordinate } from "common/math/Coordinate";

export class LineLayer extends Layer<LinkLine> {
	private _line = new Konva.Line({
		points: [],
		stroke: "red",
	});

	constructor() {
		super();
		this.layer().add(this._line);
	}

	showConnectionLine(show: boolean) {
		this._line.visible(show);
		this.redraw();
	}

	drawConnectionLine(startPos: Coordinate, endPos: Coordinate) {
		this._line.points([startPos.x, startPos.y, endPos.x, endPos.y]);
		this._line.moveToTop();
		this.redraw();
	}
}