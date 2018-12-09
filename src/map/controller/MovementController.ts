import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { GridLayer } from "map/view/GridLayer";
import { NodeLayer } from "map/view/NodeLayer";

export class MovementController extends Disposable {
	static CELL_WIDTH = 150;
	static CELL_HEIGHT = 110;

	private _nodeLayer: NodeLayer;
	private _gridLayer: GridLayer;

	constructor(nodeLayer: NodeLayer, gridLayer: GridLayer) {
		super();
		this._gridLayer = gridLayer;
		this._nodeLayer = nodeLayer;
	}

	updateGridLayer(mousePos: Coordinate) {
		const intersects = this._nodeLayer.intersects(mousePos);
		this._gridLayer.showCell(!intersects);
		this._gridLayer.updateCellPosition(mousePos);
	}

	static toRelative(position: Coordinate): Coordinate {
		return new Coordinate(position.x / this.CELL_WIDTH, position.y / this.CELL_HEIGHT).floor();
	}

	static toAbsolute(position: Coordinate): Coordinate {
		return new Coordinate(position.x * this.CELL_WIDTH, position.y * this.CELL_HEIGHT);
	}

	static toGridPosition(position: Coordinate): Coordinate {
		position = this.toRelative(position);
		return this.toAbsolute(position);
	}
}