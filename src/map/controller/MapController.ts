import { SelectionList } from "map/controller/SelectionList";
import { notImplement } from "common/utils/tools";
import { Disposable } from "common/component/Disposable";
import { MapView } from "map/view/MapView";
import { NodeController } from "map/controller/NodeController";

export class MapController extends Disposable {
	private _selectionList = new SelectionList();
	private _nodeController: NodeController;
	private _view: MapView;

	constructor(view: MapView) {
		super();
		this._view = view;
		this._nodeController = new NodeController(this._selectionList, this._view.workArea());
	}

	selectionList(): SelectionList {
		return this._selectionList;
	}

	connect() {
		notImplement();
	}

	disconnect() {
		notImplement();
	}

	appendNode() {
		this._nodeController.appendNode();
	}

	removeNode() {
		this._nodeController.removeNode();
	}

	group() {
		this._nodeController.group();
	}

	ungroup() {
		this._nodeController.ungroup();
	}
}