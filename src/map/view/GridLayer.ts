import { Coordinate } from "common/math/Coordinate";
import { Creator } from "map/view/item/Creator";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";

export class GridLayer extends Layer {
	readonly clickItemEvent = this.createDispatcher();
	private _cell = new Creator(); // TODO: переименовать в Cell

	constructor() {
		super();
		this._cell.setSize({width: MovementController.CELL_WIDTH, height: MovementController.CELL_HEIGHT}); // TODO: передавать размеры ячейки параметром
		this._cell.on("click", (event) => {
			event.cancelBubble = true;
			this.clickItemEvent.dispatch(new Coordinate(this._cell.x(), this._cell.y()));
		});
		this._layer.add(this._cell);
		this._layer.draw();
	}

	updateCellPosition(pos: Coordinate) {
		const newPos = MovementController.toGridPosition(pos);
		const oldPos = MovementController.toGridPosition(new Coordinate(this._cell.x(), this._cell.y()));
		if (Coordinate.equals(newPos, oldPos)) {
			return;
		}
		this._cell.position(newPos);
		this._layer.batchDraw();
	}

	showCell(show: boolean) {
		this._cell.visible(show);
		this._layer.batchDraw();
	}
}