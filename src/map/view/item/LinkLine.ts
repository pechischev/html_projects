import { AbstractShape } from "common/canvas/Shape";
import * as Konva from "konva";
import { ILink } from "map/model/link/ILink";
import { CoordinateConverter } from "map/service/CoordinateConverter";

export class LinkLine extends AbstractShape<Konva.Line> {
	private _link: ILink;

	constructor(link: ILink) {
		super();

		this._link = link;
		this.addListener(link.changedPointEvent, this.updatePath, this);
		this.updatePath();
	}

	link(): ILink {
		return this._link;
	}

	setPath(path: number[]) {
		this.shape().points(path);
		this.updateEvent.dispatch();
	}

	protected createShape(): Konva.Line {
		return new Konva.Line({
			points: [],
			stroke: "black",
		});
	}

	private updatePath() {
		const startPoint = this._link.startPoint();
		const endPoint = this._link.endPoint();
		const path = [];
		const positions = [
			startPoint,
			endPoint,
		];
		for (const position of positions) {
			const absolutePosition = CoordinateConverter.toAbsolute(position);
			path.push(...[absolutePosition.x, absolutePosition.y]);
		}
		this.setPath(path);
	}
}