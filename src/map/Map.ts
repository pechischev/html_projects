import { MapController } from "map/controller/MapController";
import { MapView } from "map/view/MapView";
import { notImplement } from "common/utils/tools";

export class Map {
	private _controller = new MapController();
	private _view = new MapView(this._controller);

	constructor() {
		this.initCommands();
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