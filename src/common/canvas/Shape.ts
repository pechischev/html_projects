import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";
import { Size } from "common/math/Size";
import { Coordinate } from "common/math/Coordinate";
import { IShape } from "common/canvas/IShape";

export abstract class AbstractShape<T extends Konva.Node = Konva.Node> extends Disposable implements IShape<T> {
	readonly updateEvent = this.createDispatcher();
	readonly removeEvent = this.createDispatcher();
	readonly hoverEvent = this.createDispatcher();
	readonly leaveEvent = this.createDispatcher();
	readonly clickEvent = this.createDispatcher();

	private _shape: T;
	private _selected = false;
	private _visible = true;

	constructor(config?: object) {
		super();
		this._shape = this.createShape(config);

		this._shape.on("mouseover", (event) => this.hoverEvent.dispatch(event));
		this._shape.on("mouseleave", (event) => this.leaveEvent.dispatch(event));
		this._shape.on("click", this.onClickEvent.bind(this));
	}

	redraw() {
		this.updateEvent.dispatch();
	}

	setSelected(selected: boolean) {
		this._selected = selected;
		this.setSelectedImpl(selected);
		this.redraw();
	}

	selected(): boolean {
		return this._selected;
	}

	setSize(size: Size) {
		this._shape.setSize(size);
		this.redraw();
	}

	size(): Size {
		return this._shape.getSize();
	}

	setPosition(pos: Coordinate) {
		this._shape.position(pos);
		this.redraw();
	}

	position(): Coordinate {
		const pos = this._shape.position();
		return new Coordinate(pos.x, pos.y);
	}

	shape(): T {
		return this._shape;
	}

	setVisible(visible: boolean) {
		this._visible = visible;
		this._shape.visible(visible);
		this.redraw();
	}

	visible(): boolean {
		return this._visible;
	}

	remove() {
		this._shape.remove();
		this._shape.destroy();
		this.removeEvent.dispatch();
	}

	protected setSelectedImpl(selected: boolean) {}

	protected abstract createShape(config?: object): T;

	protected onClickEvent(event: Konva.KonvaEventObject<MouseEvent>) {
		this.clickEvent.dispatch(event);
	}
}
