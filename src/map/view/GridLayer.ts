import { Coordinate } from "common/math/Coordinate";
import * as Konva from "konva";
import { Cell } from "map/view/item/Cell";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";

export class GridLayer extends Layer {
	readonly clickItemEvent = this.createDispatcher();
	private _cell = new Cell();

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
		this._layer.removeChildren();
		this.renderGrid();
		this._cell.position(newPos);
		this._layer.add(this._cell);
		this._layer.batchDraw();
	}

	showCell(show: boolean) {
		this._cell.visible(show);
		this._layer.batchDraw();
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