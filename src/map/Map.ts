import { MapController } from "map/controller/MapController";
import { MapView } from "map/view/MapView";
import { Disposable } from "common/component/Disposable";

export class Map extends Disposable {
	private _view = new MapView();
	private _controller = new MapController(this._view);

	constructor() {
		super();
		this.initCommands();
	}

	container() {
		return this._view.element();
	}

	private initCommands() {
		const toolbar = this._view.toolbar();
		toolbar.register(() => this._controller.appendNode(), "Add node");
		toolbar.register(() => this._controller.group(), "Group");
		toolbar.register(() => this._controller.ungroup(), "Ungroup");
		toolbar.register(() => this._controller.removeNode(), "Remove node");
	}
}