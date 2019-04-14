import { PlacemarkItem } from "house-map/model/PlacemarkItem";
import { Disposable } from "common/component/Disposable";
import { IFormData } from "house-map/model/IFormData";

export class AppController extends Disposable {
	readonly selectItemEvent = this.createDispatcher();
	readonly createItemEvent = this.createDispatcher();
	readonly removeItemEvent = this.createDispatcher();

	private items: PlacemarkItem[] = [];
	private selectedItem?: PlacemarkItem;

	createItem(coords: number[], data: IFormData) {
		const item = new PlacemarkItem(data.title, coords);
		item.setImages(data.images);
		this.addListener(item.clickEvent, this.selectItem.bind(this));
		this.items.push(item);
		this.createItemEvent.dispatch(item);
	}

	updateItem(data: IFormData) {
		if (!this.selectedItem) {
			return;
		}
		const {images, title} = data;
		this.selectedItem.setImages(images);
		this.selectedItem.setTitle(title);
	}

	selectItem(item: PlacemarkItem) {
		this.selectedItem = item;
		this.selectItemEvent.dispatch();
	}

	getSelectedItem(): PlacemarkItem {
		return this.selectedItem;
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