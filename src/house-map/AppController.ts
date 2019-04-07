import { PlacemarkItem } from "house-map/model/PlacemarkItem";
import { Disposable } from "common/component/Disposable";

export class AppController extends Disposable {
	readonly selectItemEvent = this.createDispatcher();
	readonly createItemEvent = this.createDispatcher();
	readonly removeItemEvent = this.createDispatcher();

	private items: PlacemarkItem[] = [];
	private selectedItem?: PlacemarkItem;

	createItem(coords: number[]) {
		const item = new PlacemarkItem("", coords);
		this.addListener(item.clickEvent, (item: PlacemarkItem) => {
			this.selectedItem = item;
			this.selectItemEvent.dispatch();
		});
		this.items.push(item);
		this.createItemEvent.dispatch(item);
	}

	updateItem() {

	}

	removeItem() {
		if (!this.selectedItem) {
			return;
		}
		const index = this.items.indexOf(this.selectedItem);
		if (!~index) {
			return;
		}
		this.items.splice(index, 1);
		this.removeItemEvent.dispatch(this.selectedItem);
		this.selectedItem = null;
	}
}