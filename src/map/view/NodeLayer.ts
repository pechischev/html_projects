import * as Konva from "konva";
import { NodeView } from "map/view/item/NodeView";
import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";
import { Cell } from "map/view/item/Cell";
import { Size } from "common/math/Size";
import { Config } from "map/config/Config";
import { CanvasApi } from "common/canvas/api/CanvasApi";
import { CoordinateConverter } from "map/service/CoordinateConverter";

export class NodeLayer extends Layer<NodeView> {
	readonly clickCellEvent = this.createDispatcher();

	private _cell = new Cell();

	constructor(api: CanvasApi) {
		super();

		this._cell.setSize(new Size(Config.CELL_WIDTH, Config.CELL_HEIGHT)); // TODO: передавать размеры ячейки параметром
		this.layer().add(this._cell.shape());

		this.addListener(this._cell.updateEvent, this.redraw, this);
		this.addListener(this._cell.clickEvent, () => {
			this._cell.setVisible(false);
			this.clickCellEvent.dispatch(this._cell.position());
		});

		this.addListener(api.mouseMoveEvent, (event: Konva.KonvaEventObject<MouseEvent>) => {
			const mouseEvent = event.evt;
			const mousePos = new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY);
			this.updateCellPosition(mousePos);
		});
	}

	private updateCellPosition(pos: Coordinate) {
		const isEmpty = !this.getViewByCoordinate(pos);
		this._cell.setVisible(isEmpty);
		if (!isEmpty) {
			return;
		}
		const newPos = CoordinateConverter.toGridPosition(pos);
		const oldPos = CoordinateConverter.toGridPosition(this._cell.position());
		if (Coordinate.equals(newPos, oldPos)) {
			return;
		}
		this._cell.setPosition(newPos);
	}
}