import { Listener } from "common/event/Listener";
import { ILink } from "map/model/link/ILink";

export class LinkPresenter extends Listener {
	private _links: ILink[] = [];

	appendLink(link: ILink) {
		if (this.hasLink(link)) {
			return;
		}
		this._links.push(link);
	}

	removeLink(link: ILink) {
		const index = this.getLinkIndex(link);
		if (index < 0) {
			return;
		}
		this._links.splice(index, 1);
	}

	links(): ILink[] {
		return this._links;
	}

	getLink(link: ILink): ILink|null {
		return this._links.find((value: ILink) => value.source() == link.source() && value.target() == link.target()) || null;
	}

	private hasLink(link: ILink): boolean {
		return !!this.getLink(link);
	}

	private getLinkIndex(link: ILink): number {
		return this._links.findIndex((value: ILink) => value.source() == link.source() && value.target() == link.target());
	}
}