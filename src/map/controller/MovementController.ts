import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { GridLayer } from "map/view/GridLayer";
import { NodeLayer } from "map/view/NodeLayer";
import { Config } from "map/config/Config";

export class MovementController extends Disposable {
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
		return new Coordinate(position.x / Config.CELL_WIDTH, position.y / Config.CELL_HEIGHT).floor();
	}

	static toAbsolute(position: Coordinate): Coordinate {
		return new Coordinate(position.x * Config.CELL_WIDTH, position.y * Config.CELL_HEIGHT);
	}

	static toGridPosition(position: Coordinate): Coordinate {
		position = this.toRelative(position);
		return this.toAbsolute(position);
	}
}