import { MapItem } from "map/model/item/MapItem";
import { RouteItem } from "map/model/route/RouteItem";
import { ILink } from "map/model/route/ILink";
import { INode } from "./INode";

export class AbstractNode extends MapItem implements INode {
	protected _routeItem = new RouteItem();

	addLink(link: ILink) {
		this._routeItem.addLink(link);
	}

	removeLink(link: ILink) {
		this._routeItem.removeLink(link);
	}
}
