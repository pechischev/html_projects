import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";
import { IShape } from "common/canvas/IShape";

export class Layer<T extends IShape = IShape> extends Disposable {
	readonly clickLayerEvent = this.createDispatcher();
	readonly clickItemEvent = this.createDispatcher();

	protected _layer = new Konva.Layer();
	protected _items: T[] = [];

	constructor() {
		super();

		this._layer.on("click", () => this.clickLayerEvent.dispatch());
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
		this.addListener(item.updateEvent, () => this._layer.batchDraw());
		const shape = item.shape();
		shape.on("click", (event) => {
			event.cancelBubble = true;
			this.clickItemEvent.dispatch(item);
		});
		this._items.push(item);
		this._layer.add(shape);
		shape.draw();
	}
}