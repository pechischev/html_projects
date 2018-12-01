import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";
import { Cell } from "map/view/item/Cell";
import { IDispatcher } from "common/event/IDispatcher";
import { Coordinate } from "common/math/Coordinate";

export class GridLayer extends Disposable {
	private _layer = new Konva.Layer();
	private _field: Cell[][] = [];

	private _clickItemEvent = this.createDispatcher();

	constructor() {
		super();
		this.init();
	}

	clickItemEvent(): IDispatcher {
		return this._clickItemEvent;
	}

	layer(): Konva.Layer {
		return this._layer;
	}

	invalidate() {
		this._layer.removeChildren();

		for (const row of this._field) {
			this._layer.add(...row);
		}
		this._layer.draw();
	}

	private init() {
		const size = 10;
		const width = 220;
		const height = 155;
		for (let x = 0; x < size; ++x) {
			const row = [];
			for (let y = 0; y < size; ++y) {
				const cell = new Cell();
				cell.on("click", () => this._clickItemEvent.dispatch(new Coordinate(x, y)));
				cell.setSize({width, height});
				cell.setPosition(width * x, height * y);
				row.push(cell);
				this._layer.add(cell);
			}
			this._field.push(row);
		}
		this._layer.draw();
	}
}