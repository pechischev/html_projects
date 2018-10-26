import { ILink } from "./ILink";

export interface IRouteItem {
	addLink(link: ILink): void;

	removeLink(link: ILink): void;
}
