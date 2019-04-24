import { ILink } from "map/model/link/ILink";
import { Disposable } from "common/component/Disposable";

export class LinkList extends Disposable {
	readonly appendLinkEvent = this.createDispatcher();
	readonly removeLinkEvent = this.createDispatcher();

	private _links: ILink[] = [];

	appendLink(link: ILink) {
		if (this.hasLink(link)) {
			return;
		}
		this._links.push(link);
		this.appendLinkEvent.dispatch(link);
	}

	removeLink(link: ILink) {
		const index = this.getLinkIndex(link);
		if (index < 0) {
			return;
		}
		this._links.splice(index, 1);
		this.removeLinkEvent.dispatch(link);
	}

	links(): ILink[] {
		return this._links;
	}

	getLinkByItems(first: string, second: string): ILink|null {
		const check = (source: string, target: string, link: ILink): boolean => {
			return link.source() == source && link.target() == target;
		};
		return this._links.find((link: ILink) => check(first, second, link) || check(second, first, link)) || null;
	}

	getLink(id: string): ILink|null {
		return this._links.find((link) => link.id() == id) || null;
	}

	private hasLink(link: ILink): boolean {
		return !!~this.getLinkIndex(link);
	}

	private getLinkIndex(link: ILink): number {
		return this._links.findIndex((value: ILink) => value.source() == link.source() && value.target() == link.target());
	}
}