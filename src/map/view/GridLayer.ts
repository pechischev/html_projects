import { Coordinate } from "common/math/Coordinate";
import * as Konva from "konva";
import { Cell } from "map/view/item/Cell";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";

export class GridLayer extends Layer {
	private _cell = new Cell();

	constructor() {
		super();
		this._cell.setSize({width: MovementController.CELL_WIDTH, height: MovementController.CELL_HEIGHT}); // TODO: передавать размеры ячейки параметром
		this.drawItem(this._cell);
	}

	updateCellPosition(pos: Coordinate) {
		const newPos = MovementController.toGridPosition(pos);
		const oldPos = MovementController.toGridPosition(this._cell.position());
		if (Coordinate.equals(newPos, oldPos)) {
			return;
		}
		this._cell.setPosition(newPos);
	}

	showCell(show: boolean) {
		this._cell.setVisible(show);
	}

	private renderGrid() {
		const size = this._layer.getSize();
		const columns = Math.ceil(size.width / MovementController.CELL_WIDTH);
		const rows = Math.ceil(size.height / MovementController.CELL_HEIGHT);
		for (let y = 0; y < rows; ++y) {
			for (let x = 0; x < columns; ++x) {
				const position = MovementController.toAbsolute(new Coordinate(x, y));
				this._layer.add(new Konva.Rect({
					width: MovementController.CELL_WIDTH,
					height: MovementController.CELL_HEIGHT,
					x: position.x,
					y: position.y,
					strokeWidth: 1,
					stroke: "#F0F4F7"
				}));
			}
		}
	}
}