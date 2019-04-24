import { ILink } from "map/model/link/ILink";
import { Link } from "map/model/link/Link";
import { Coordinate } from "common/math/Coordinate";
import { NodeView } from "map/view/item/NodeView";

export class ConnectionService {
	static connect(source: NodeView, target: NodeView): ILink {
		const first = source.node();
		const second = target.node();
		const link = new Link(first.id(), second.id());

		const point = 0.5;

		first.changedPositionEvent.addListener(() => link.setStartPoint(new Coordinate(point, point).translate(first.position())));
		second.changedPositionEvent.addListener(() => link.setEndPoint(new Coordinate(point, point).translate(second.position())));
		link.setStartPoint(new Coordinate(point, point).translate(first.position()));
		link.setEndPoint(new Coordinate(point, point).translate(second.position()));
		return link;
	}
}