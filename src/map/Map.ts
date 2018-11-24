import { MapController } from "map/controller/MapController";
import { MapView } from "map/view/MapView";
import { notImplement } from "common/utils/tools";
import { Disposable } from "common/component/Disposable";

export class Map extends Disposable {
	private _view = new MapView();
	private _controller = new MapController();

	constructor() {
		super();
		this.initCommands();

		const workArea = this._view.workArea();
		workArea.setSelectionList(this._controller.selectionList());

		this.addListener(this._controller.createdNodeEvent(), <INode>(node) => workArea.createNode(node));
	}

	container() {
		return this._view.element();
	}

	load() {
		notImplement();
	}

	save() {
		notImplement();
	}

	private initCommands() {
		const toolbar = this._view.toolbar();
		toolbar.register(() => this._controller.appendNode(), "Add node");
		toolbar.register(() => this._controller.group(), "Group");
		toolbar.register(() => this._controller.ungroup(), "Ungroup");
		toolbar.register(() => this._controller.removeNode(), "Remove node");
	}
}