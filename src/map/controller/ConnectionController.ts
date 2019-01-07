import { Disposable } from "common/component/Disposable";
import { LinkList } from "map/controller/list/LinkList";
import { ConnectionList } from "map/controller/list/ConnectionList";
import { ILink } from "map/model/link/ILink";
import { SelectionList } from "map/controller/list/SelectionList";

export class ConnectionController extends Disposable {
	readonly connectEvent = this.createDispatcher();
	readonly disconnectEvent = this.createDispatcher();
	readonly changedSelectionEvent = this.createDispatcher();

	private _linkList = new LinkList();
	private _connectionList = new ConnectionList();
	private _selectionList: SelectionList;

	constructor(selectionList: SelectionList) {
		super();

		this._selectionList = selectionList;

		this.addDisposable(selectionList);
		this.addDisposable(this._linkList);
		this.addDisposable(this._connectionList);

		this.addListener(this._connectionList.connectEvent, this.onConnect, this);
		this.addListener(this._connectionList.disconnectEvent, this.onDisconnect, this);
		this.addListener(this._selectionList.changeSelectionEvent, (selectedItems) => this.changedSelectionEvent.dispatch(selectedItems));
	}

	setSelection(nodes: ILink[], isMulti: boolean = false) {
		this._selectionList.setSelection(nodes.map((item) => item.id()), isMulti);
	}

	getSelectedLinks(): ILink[] {
		const selection = this._selectionList.getSelection();
		return selection.map((id) => this._linkList.getLink(id));
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