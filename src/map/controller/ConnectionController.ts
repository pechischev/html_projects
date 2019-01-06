import { Disposable } from "common/component/Disposable";
import { LinkList } from "map/controller/list/LinkList";
import { ConnectionList } from "map/controller/list/ConnectionList";
import { NodeList } from "map/controller/list/NodeList";
import { ILink } from "map/model/link/ILink";

export class ConnectionController extends Disposable {
	readonly connectEvent = this.createDispatcher();
	readonly disconnectEvent = this.createDispatcher();

	private _linkList = new LinkList();
	private _connectionList = new ConnectionList();
	private _nodeList: NodeList;

	constructor(nodeList: NodeList) {
		super();
		this._nodeList = nodeList;

		this.addDisposable(this._linkList);
		this.addDisposable(this._connectionList);
		this.addDisposable(this._nodeList);

		this.addListener(this._connectionList.connectEvent, this.onConnect, this);
		this.addListener(this._connectionList.disconnectEvent, this.onDisconnect, this);
	}

	createConnection(link: ILink) {
		this._linkList.appendLink(link);
		this._connectionList.connect(link.source(), link.target());
	}

	removeConnection(link: ILink) {
		this._connectionList.disconnect(link.source(), link.target());
		this._linkList.removeLink(link);
	}

	removeAllConnections(item: string) {
		const connections = this._connectionList.getConnections(item);
		connections.forEach((connection) => {
			const link = this._linkList.getLinkByItems(item, connection);
			this.removeConnection(link);
		});
	}

	private onConnect(source: string, target: string) {
		this.connectEvent.dispatch(this._linkList.getLinkByItems(source, target));
	}

	private onDisconnect(source: string, target: string) {
		this.disconnectEvent.dispatch(this._linkList.getLinkByItems(source, target));
	}
}