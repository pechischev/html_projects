import { IRouteItem } from "./IRouteItem";
import { ILink } from "./ILink";

export class RouteItem implements IRouteItem {
	private readonly _links: ILink[] = [];

	addLink(link: ILink) {}

	removeLink(link: ILink) {}
}