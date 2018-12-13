import { Disposable } from "common/component/Disposable";
import * as Konva from "konva";
import { Size } from "common/math/Size";
import { Coordinate } from "common/math/Coordinate";
import { IShape } from "common/canvas/IShape";

export abstract class AbstractShape<T extends Konva.Node = Konva.Node> extends Disposable implements IShape<T> {
	readonly updateEvent = this.createDispatcher();

	private _shape = this.createShape();
	private _selected = false;
	private _visible = true;

	setSelected(selected: boolean) {
		this._selected = selected;
		this.setSelectedImpl(selected);
		this.updateEvent.dispatch();
	}

	selected(): boolean {
		return this._selected;
	}

	setSize(size: Size) {
		this._shape.setSize(size);
		this.updateEvent.dispatch();
	}

	size(): Size {
		return this._shape.getSize();
	}

	setPosition(pos: Coordinate) {
		this._shape.position(pos);
		this.updateEvent.dispatch();
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
		this.updateEvent.dispatch();
	}

	visible(): boolean {
		return this._visible;
	}

	protected setSelectedImpl(selected: boolean) {}

	protected abstract createShape(): T;
}
