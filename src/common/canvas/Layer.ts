import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";
import { IShape } from "common/canvas/IShape";
import { Coordinate } from "common/math/Coordinate";

export class Layer<T extends IShape = IShape> extends Disposable {
	readonly clickLayerEvent = this.createDispatcher();
	readonly clickItemEvent = this.createDispatcher();

	protected _layer = new Konva.Layer();
	protected _items: T[] = [];

	constructor() {
		super();

		this._layer.on("click", () => this.clickLayerEvent.dispatch());
	}

	redraw() {
		this._layer.batchDraw();
	}

	layer(): Konva.Layer {
		return this._layer;
	}

	invalidate() {
		for (const item of this._items) {
			const shape = item.shape();
			shape.remove();
		}
		if (this._items.length) {
			this._layer.add(...this._items.map((item) => item.shape()));
		}
		this._layer.draw();
	}

	drawItem(item: T) {
		this.addListener(item.updateEvent, this.redraw, this);
		const shape = item.shape();
		shape.on("click", (event) => {
			event.cancelBubble = true;
			this.clickItemEvent.dispatch(item);
		});
		this._items.push(item);
		this._layer.add(shape);
		shape.draw();
	}

	clearItem(item: T) {
		const view = this._items.find((view) => view == item);
		if (!view) {
			return;
		}
		const shape = view.shape();
		shape.remove();
		this.redraw();
	}

	getViewByCoordinate(position: Coordinate): T|null {
		for (const item of this._items) {
			const clientRect = item.shape().getClientRect();
			const contains = (position.x >= clientRect.x &&
				position.x <= clientRect.x + clientRect.width &&
				position.y >= clientRect.y &&
				position.y <= clientRect.y + clientRect.height
			);
			if (contains) {
				return item;
			}
		}
		return null;
	}
}