import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";
import * as Konva from "konva";
import { Line } from "map/view/item/Line";

export class ConnectionLayer extends Layer {
	private _line = new Konva.Line({
		points: [],
		stroke: "red",
	});

	drawPath(path: number[]) {
		const line = new Line(path);
		this.drawItem(line);
	}

	drawLine(startPos: Coordinate, endPos: Coordinate) {
		if (!this._line.getLayer()) {
			this._layer.add(this._line);
			this._layer.draw();
		}
		this._line.points([startPos.x, startPos.y, endPos.x, endPos.y]);
		this._layer.batchDraw();
	}

	clearLine() {
		if (this._line.getLayer()) {
			this._line.remove();
		}
		this._layer.batchDraw();
	}
}