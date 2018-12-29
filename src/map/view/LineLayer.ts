import { Layer } from "common/canvas/Layer";
import { Line } from "map/view/item/Line";
import { ILink } from "map/model/link/ILink";
import { CoordinateConverter } from "map/service/CoordinateConverter";

export class LineLayer extends Layer {

	drawLine(link: ILink) {
		const startPoint = link.startPoint();
		const endPoint = link.endPoint();
		const path = [];
		const positions = [
			startPoint,
			endPoint,
		];
		for (const position of positions) {
			const absolutePosition = CoordinateConverter.toAbsolute(position);
			path.push(...[absolutePosition.x, absolutePosition.y]);
		}

		const line = new Line(path);
		this.drawItem(line);
	}
}