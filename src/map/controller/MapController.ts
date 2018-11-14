import { Listener } from "common/event/Listener";
import { NodePresenter } from "map/controller/NodePresenter";
import { LinkPresenter } from "map/controller/LinkPresenter";
import { SelectionList } from "map/controller/SelectionList";
import { ConnectionService } from "map/service/ConnectionService";

export class MapController extends Listener {
	private _selectionList = new SelectionList();
	private _nodePresenter = new NodePresenter(this._selectionList);
	private _linkPresenter = new LinkPresenter(this._selectionList);
	private _connection = new ConnectionService(this._linkPresenter);

	connect() {}

	disconnect() {}

	appendNode() {}

	removeNode() {}

	group() {}

	ungroup() {}
}