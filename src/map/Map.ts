import { MapController } from "map/controller/MapController";
import { MapView } from "map/view/MapView";
import { notImplement } from "common/utils/tools";

export class Map {
	private _controller = new MapController();
	private _view = new MapView();

	container() {
		return this._view.element();
	}

	load() {
		notImplement();
	}

	save() {
		notImplement();
	}
}