import { Listener } from "common/event/Listener";
import { IRouteItem } from "./IRouteItem";
import { ILink } from "./ILink";

export class RouteItem extends Listener implements IRouteItem {
	private readonly _links: ILink[] = [];

	addLink(link: ILink) {

	}

	removeLink(link: ILink) {}
}