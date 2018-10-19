import { Listener } from "common/event/Listener";

export class SelectController extends Listener {
	private _selectedItems: string[] = [];

	select(id: string, isMulti: boolean = false) {
		const index = this._selectedItems.indexOf(id);
		if (index > -1) {
			this._selectedItems.splice(index, 1);
			return;
		}
		let selectedItems = [id];
		if (isMulti) {
			selectedItems = [...this._selectedItems, ...selectedItems];
		}
		this._selectedItems = selectedItems;
	}

	isSelected(id: string): boolean {
		const index = this._selectedItems.indexOf(id);
		return index > -1;
	}

	getSelectedItems(): string[] {
		return this._selectedItems;
	}
}