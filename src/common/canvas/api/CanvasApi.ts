import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";
import { IDispatcher } from "common/event/IDispatcher";

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

		this._canvas.on("click", (event) => this.onEvent(event, this.clickEvent));
		this._canvas.on("mousedown", (event) => this.onEvent(event, this.mouseDownEvent));
		this._canvas.on("mousemove", (event) => this.onEvent(event, this.mouseMoveEvent));
		this._canvas.on("mouseup", (event) => this.onEvent(event, this.mouseUpEvent));
		this._canvas.on("dragstart", (event) => this.dragStartEvent.dispatch(event));
		this._canvas.on("dragend", (event) => this.dragEndEvent.dispatch(event));
	}

	private onEvent<T>(event: Konva.KonvaEventObject<T>, dispatcher: IDispatcher) {
		if (event.target.name() != this._canvas.name()) {
			return;
		}
		dispatcher.dispatch(event);
	}
}