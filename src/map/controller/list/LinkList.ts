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

	getLinkByTargets(source: string, target: string): ILink|null { // TODO: rename
		return this._links.find((value: ILink) => value.source() == source && value.target() == target) || null;
	}

	getLink(link: ILink): ILink|null {
		const index = this.getLinkIndex(link);
		return this._links[index] || null;
	}

	private hasLink(link: ILink): boolean {
		return !!this.getLink(link);
	}

	private getLinkIndex(link: ILink): number {
		return this._links.findIndex((value: ILink) => value.source() == link.source() && value.target() == link.target());
	}
}