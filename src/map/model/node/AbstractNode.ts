import { MapItem } from "map/model/item/MapItem";
import { RouteItem } from "map/model/route/RouteItem";
import { ILink } from "map/model/route/ILink";
import { INode } from "./INode";

export class AbstractNode extends MapItem implements INode {
	protected _routeItem = new RouteItem();
	protected _parent?: string = null;

	addLink(link: ILink) {
		this._routeItem.addLink(link);
	}

	removeLink(link: ILink) {
		this._routeItem.removeLink(link);
	}

	setParent(id: string = null) {
		this._parent = id;
	}

	parent(): string|null {
		return this._parent;
	}
}
