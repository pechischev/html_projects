import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";

export class Layer extends Disposable {
	readonly clickLayerEvent = this.createDispatcher();

	protected _layer = new Konva.Layer();

	constructor() {
		super();

		this._layer.on("click", () => this.clickLayerEvent.dispatch());
	}

	layer(): Konva.Layer {
		return this._layer;
	}
}