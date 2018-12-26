import { Disposable } from "common/component/Disposable";
import { LinkList } from "map/controller/list/LinkList";
import { ConnectionList } from "map/controller/list/ConnectionList";
import { NodeList } from "map/controller/list/NodeList";
import { Link } from "map/model/link/Link";
import { MovementController } from "map/controller/MovementController";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { ILink } from "map/model/link/ILink";

export class ConnectionController extends Disposable {
	readonly connectEvent = this.createDispatcher();
	readonly disconnectEvent = this.createDispatcher();

	private _links: Link[] = [];
	private _linkList = new LinkList();
	private _connectionList = new ConnectionList();
	private _nodeList: NodeList;

	constructor(nodeList: NodeList) {
		super();
		this._nodeList = nodeList;

		this.addDisposable(this._linkList);
		this.addDisposable(this._connectionList);
		this.addDisposable(this._nodeList);

		//this.addListener(this._connectionList.connectEvent, (source: string, target: string) => this._linkList.appendLink(new Link(source, target)));
		this.addListener(this._connectionList.connectEvent, this.onConnect, this);
		//this.addListener(this._connectionList.disconnectEvent, (source: string, target: string) => this._linkList.removeLink(new Link(source, target)));
		this.addListener(this._connectionList.disconnectEvent, this.onDisconnect, this);
	}

	createLink(source: INode, target: INode, startPoint: Coordinate, endPoint: Coordinate) {
		if (this._connectionList.isConnected(source.id(), target.id())) {
			return;
		}
		const link = new Link(source.id(), target.id());
		link.setStartPoint(startPoint);
		link.setEndPoint(endPoint);
		this._links.push(link);
		this._connectionList.connect(source.id(), target.id());
	}

	removeLink(source: string, target: string) {
		this._connectionList.disconnect(source, target);
	}

	private onConnect(source: string, target: string) {
		const startItem = this._nodeList.getNodeById(source);
		const endItem = this._nodeList.getNodeById(target);
		const link = this.getLink(source, target);
		const path = [];
		const positions = [
			link.startPoint().translate(startItem.position()),
			link.endPoint().translate(endItem.position()),
		];
		for (const position of positions) {
			const absolutePosition = MovementController.toAbsolute(position);
			path.push(...[absolutePosition.x, absolutePosition.y]);
		}
		// this.connectEvent.dispatch();
	}

	private onDisconnect(source: string, target: string) {
		// this.disconnectEvent.dispatch();
	}

	private getLink(source: string, target: string): Link|null {
		const index = this.getLinkIndex(source, target);
		return this._links[index] || null;
	}

	private getLinkIndex(source: string, target: string): number {
		return this._links.findIndex((value: ILink) => value.source() == source && value.target() == target);
	}
}