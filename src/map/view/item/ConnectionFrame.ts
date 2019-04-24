import * as Konva from "konva";
import { Config } from "map/config/Config";
import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { NodeView } from "./NodeView";

export class ConnectionFrame extends Disposable {
	readonly mouseDownEvent = this.createDispatcher();

	private _nodeView: NodeView;
	private _triggers: Konva.Circle[] = this.getTriggers();

	constructor(nodeView: NodeView) { // TODO: IShape
		super();
		this._nodeView = nodeView;
		this.addDisposable(nodeView);
		const shape = nodeView.shape();
		shape.add(...this._triggers);

		this.addListener(nodeView.removeEvent, () => this.dispose());
		this.addListener(nodeView.hoverEvent, () => {
			this.setVisibleTriggers(true);
			nodeView.redraw();
		});
		this.addListener(nodeView.leaveEvent, () => {
			this.setVisibleTriggers(false);
			nodeView.redraw();
		});
	}

	private getTriggers(): Konva.Circle[] {
		const offset = 10;
		return [
			this.createCircle(new Coordinate(Config.CELL_WIDTH / 2, offset)),
			this.createCircle(new Coordinate(Config.CELL_WIDTH - offset, Config.CELL_HEIGHT / 2)),
			this.createCircle(new Coordinate(Config.CELL_WIDTH / 2, Config.CELL_HEIGHT - offset)),
			this.createCircle(new Coordinate(offset, Config.CELL_HEIGHT / 2))
		];
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

	private setVisibleTriggers(value: boolean) {
		for (const trigger of this._triggers) {
			trigger.visible(value);
		}
	}
}