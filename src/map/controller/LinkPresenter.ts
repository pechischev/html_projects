import { Listener } from "common/event/Listener";
import { ILink } from "map/model/link/ILink";

export class LinkPresenter extends Listener {
	private _links: ILink[] = [];

	appendLink(link: ILink) {}

	removeLink(link: ILink) {}

	links(): ILink[] {
		return this._links;
	}
}