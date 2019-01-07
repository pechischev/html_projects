import * as Konva from "konva";
import { AbstractShape } from "common/canvas/Shape";
import { Size } from "common/math/Size";
import { Config } from "map/config/Config";

const CLICKABLE_SIZE = 50;

export class Cell extends AbstractShape<Konva.Group> {
	private _rect: Konva.Rect;
	private _point: Konva.Rect;

	constructor() {
		super();

		this._rect = new Konva.Rect({
			fill: "#ABBCC3",
			opacity: 0.1,
		});

		this._point = new Konva.Rect({
			fill: "white",
			stroke: "#26A092",
			strokeWidth: 1,
			cornerRadius: 50,
			width: CLICKABLE_SIZE,
			height: CLICKABLE_SIZE,
		});

		const shape = this.shape();
		shape.add(this._rect);

		const offsetX = (Config.CELL_WIDTH - Config.NODE_WIDTH) / 2;
		const offsetY = (Config.CELL_HEIGHT - Config.NODE_HEIGHT) / 2;

		shape.add(new Konva.Rect({
			height: Config.NODE_HEIGHT,
			width: Config.NODE_WIDTH,
			stroke: "#D5D5D5",
			dashEnabled: true,
			dash: [4, 4],
			strokeWidth: 1,
			cornerRadius: 10,
			offsetX: -offsetX,
			offsetY: -offsetY
		}));

		shape.add(this._point);
	}

	setSize(size: Size) {
		this._rect.setSize(size);
		this._point.x((size.width - CLICKABLE_SIZE) / 2);
		this._point.y((size.height - CLICKABLE_SIZE) / 2);
		super.setSize(size);
	}

	protected createShape(): Konva.Group {
		return new Konva.Group();
	}

	protected onClickEvent(event: Konva.KonvaEventObject<MouseEvent>) {
		const isPoint = this._point.intersects({x: event.evt.offsetX, y: event.evt.offsetY});
		if (!isPoint) {
			return;
		}
		event.cancelBubble = true;
		super.onClickEvent(event);
	}
}