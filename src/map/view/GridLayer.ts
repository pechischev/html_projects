import { Coordinate } from "common/math/Coordinate";
import { Cell } from "map/view/item/Cell";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";
import { Config } from "map/config/Config";
import { Size } from "common/math/Size";

export class GridLayer extends Layer {
	private _cell = new Cell();

	constructor() {
		super();
		this._cell.setSize(new Size(Config.CELL_WIDTH, Config.CELL_HEIGHT)); // TODO: передавать размеры ячейки параметром
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
}