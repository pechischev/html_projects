import * as Konva from "konva";
import { Coordinate } from "common/math/Coordinate";
import { Group } from "common/canvas/Group";

export class ConnectionFrame extends Group {
	readonly mouseDownEvent = this.createDispatcher();

	private _triggers: Konva.Circle[] = [];

	createFrame(shape: Konva.Node) {
		this.shape().offset(shape.offset());
		const {width, height} = shape.getSize();
		this._triggers = [
			this.createCircle(new Coordinate(width / 2, 0)),
			this.createCircle(new Coordinate(width, height / 2)),
			this.createCircle(new Coordinate(width / 2, height)),
			this.createCircle(new Coordinate(0, height / 2))
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

	private createCircle(pos: Coordinate): Konva.Circle {
		const circle = new Konva.Circle({
			radius: 7,
			x: pos.x,
			y: pos.y,
			fill: "#818381",
		});
		circle.on("mousedown", (event) => {
			event.cancelBubble = true;
			this.mouseDownEvent.dispatch(circle.getAbsolutePosition());
		});
		return circle;
	}
}