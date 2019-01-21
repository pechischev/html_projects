import * as Konva from "konva";
import { Coordinate } from "common/math/Coordinate";
import { Group } from "common/canvas/Group";

export class ConnectionFrame extends Group {
	private _triggers: Konva.Circle[] = [];

	createFrame(shape: Konva.Node) {
		this.shape().offset(shape.offset());
		const {width, height} = shape.getSize();
		this._triggers = [
			this.createCircle(new Coordinate(width / 2, 0)), // top
			this.createCircle(new Coordinate(width, height / 2)), // right
			this.createCircle(new Coordinate(width / 2, height)), // bottom
			this.createCircle(new Coordinate(0, height / 2)) // left
		];
		this._triggers.forEach((value) => {
			this.add(value);
		});
	}

	setVisible(visible: boolean) {
		for (const trigger of this._triggers) {
			trigger.visible(visible);
		}
		this.redraw();
	}

	getNearestPoint(pos: Coordinate): Coordinate {
		const frame = this.shape();
		const {x, y, height, width} = frame.getClientRect();

		const left = pos.distance(new Coordinate(0, height / 2).translate(x, y));
		const bottom = pos.distance(new Coordinate(width / 2, height).translate(x, y));
		const right = pos.distance(new Coordinate(width, height / 2).translate(x, y));
		const top = pos.distance(new Coordinate(width / 2, 0).translate(x, y));

		const arr = [left, bottom, right, top];
		let lowest = 0;
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] < arr[lowest]) {
				lowest = i;
			}
		}
		switch (lowest) {
			case 0:
				return new Coordinate(0, 0.5);
			case 1:
				return new Coordinate(0.5, 1);
			case 2:
				return new Coordinate(1, 0.5);
			case 3:
				return new Coordinate(0.5, 0);
			default:
				return null;
		}
	}

	protected onClickEvent(event: Konva.KonvaEventObject<MouseEvent>) {
		const isPoint = this._triggers.some((circle) => circle.intersects({x: event.evt.offsetX, y: event.evt.offsetY}));
		if (!isPoint) {
			return;
		}
		event.cancelBubble = true;
		super.onClickEvent(event);
	}

	private createCircle(pos: Coordinate): Konva.Circle {
		const circle = new Konva.Circle({
			radius: 7,
			x: pos.x,
			y: pos.y,
			fill: "#818381",
		});
		circle.on("click", this.onClickEvent.bind(this));
		return circle;
	}
}