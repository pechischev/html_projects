import { LinkList } from "map/controller/LinkList";
import { Link } from "map/model/link/Link";
import { ConnectionList } from "map/controller/ConnectionList";

export class ConnectionService {
	private _presenter: LinkList;
	private _list = new ConnectionList();

	constructor(presenter: LinkList) {
		this._presenter = presenter;
	}

	connect(source: string, target: string) {
		this._presenter.appendLink(new Link(source, target));
		this._list.connect(source, target);
	}

	disconnect(source: string, target: string) {
		this._list.disconnect(source, target);
		this._presenter.removeLink(new Link(source, target));
	}

	isConnected(item: string, otherItem: string): boolean {
		return this._list.isConnected(item, otherItem);
	}

	getConnections(item: string): string[] {
		return this._list.getConnections(item);
	}
}