import { IMapItem } from "map/model/item/IMapItem";
import { IRouteItem } from "map/model/route/IRouteItem";

export interface INode extends IMapItem, IRouteItem {
	parent(): string|null;

	setParent(id: string);
}