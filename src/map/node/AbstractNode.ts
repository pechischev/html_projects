import { MapItem } from "map/item/MapItem";
import { IRouteItem } from "map/route/IRouteItem";
import { RouteItem } from "map/route/RouteItem";
import { ILink } from "map/route/ILink";

export class AbstractNode extends MapItem implements IRouteItem {
	protected _routeItem = new RouteItem();

	addLink(link: ILink) {
		this._routeItem.addLink(link);
	}

	removeLink(link: ILink) {
		this._routeItem.removeLink(link);
	}
}
