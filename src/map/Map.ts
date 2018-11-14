import { MapController } from "map/controller/MapController";
import { MapView } from "map/view/MapView";

export class Map {
	private _controller = new MapController();
	private _view = new MapView();

	container() {
		return this._view.element();
	}
}