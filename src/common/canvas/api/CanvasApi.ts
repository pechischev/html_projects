import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";

export class CanvasApi extends Disposable {
	readonly mouseDownEvent = this.createDispatcher();
	readonly mouseMoveEvent = this.createDispatcher();
	readonly mouseUpEvent = this.createDispatcher();
	readonly dragStartEvent = this.createDispatcher();
	readonly dragEndEvent = this.createDispatcher();
	readonly clickEvent = this.createDispatcher();

	private _canvas: Konva.Stage;

	constructor(canvas: Konva.Stage) {
		super();

		this._canvas = canvas;

		this._canvas.on("click", (event) => this.clickEvent.dispatch(event));
		this._canvas.on("mousedown", (event) => this.mouseDownEvent.dispatch(event));
		this._canvas.on("mousemove", (event) => this.mouseMoveEvent.dispatch(event));
		this._canvas.on("mouseup", (event) => this.mouseUpEvent.dispatch(event));
		this._canvas.on("dragstart", (event) => this.dragStartEvent.dispatch(event));
		this._canvas.on("dragend", (event) => this.dragEndEvent.dispatch(event));
	}
}