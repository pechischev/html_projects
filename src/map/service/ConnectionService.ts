import { INode } from "map/model/node/INode";
import { LinkPresenter } from "map/controller/LinkPresenter";

export class ConnectionService {
	private _presenter: LinkPresenter;
	private _connections = new Map<string, string[]>();

	constructor(presenter: LinkPresenter) {
		this._presenter = presenter;
	}

	connect(source: INode, target: INode) {

	}

	disconnect(source: INode, target: INode) {

	}
}