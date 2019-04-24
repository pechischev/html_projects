import { LinkList } from "map/controller/list/LinkList";
import { Link } from "map/model/link/Link";
import { ConnectionList } from "map/controller/list/ConnectionList";
import { Disposable } from "common/component/Disposable";

export class ConnectionManager extends Disposable {
	readonly connectEvent = this.createDispatcher();
	readonly disconnectEvent = this.createDispatcher();

	private _presenter: LinkList;
	private _list = new ConnectionList();

	constructor(presenter: LinkList) {
		super();
		this._presenter = presenter;
		this.addDisposable(this._presenter);
		this.addDisposable(this._list);

		this.addListener(this._list.connectEvent, (source: string, target: string) => this._presenter.appendLink(new Link(source, target)));
		this.addListener(this._list.connectEvent, () => this.connectEvent.dispatch());
		this.addListener(this._list.disconnectEvent, (source: string, target: string) => this._presenter.removeLink(new Link(source, target)));
		this.addListener(this._list.disconnectEvent, () => this.disconnectEvent.dispatch());
	}

	connect(source: string, target: string) {
		this._list.connect(source, target);
	}

	disconnect(source: string, target: string) {
		this._list.disconnect(source, target);
	}

	isConnected(item: string, otherItem: string): boolean {
		return this._list.isConnected(item, otherItem);
	}

	getConnections(item: string): string[] {
		return this._list.getConnections(item);
	}
}