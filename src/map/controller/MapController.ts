import { Listener } from "common/event/Listener";
import { NodePresenter } from "map/controller/NodePresenter";
import { LinkPresenter } from "map/controller/LinkPresenter";
import { SelectionPresenter } from "map/controller/SelectionPresenter";
import { ConnectionService } from "map/service/ConnectionService";
import { notImplement } from "common/utils/tools";
import { NodeFactory } from "map/controller/factory/NodeFactory";

export class MapController extends Listener {
	private _selectionList = new SelectionPresenter();
	private _nodePresenter = new NodePresenter();
	private _linkPresenter = new LinkPresenter();
	private _connection = new ConnectionService(this._linkPresenter);

	connect() {
		notImplement();
	}

	disconnect() {
		notImplement();
	}

	appendNode() {
		const node = NodeFactory.createItem("Node");
		this._nodePresenter.appendNodes([node]);
		this._selectionList.setSelection([node.id()]);
		this.dispatch("createNode", node);
	}

	removeNode() {
		notImplement();
	}

	group() {
		notImplement();
	}

	ungroup() {
		notImplement();
	}
}