import { Listener } from "common/event/Listener";

export class SelectController extends Listener {
	private _selectedItems: string[] = [];

	setSelection(items: string[], isMulti?: boolean) {
		this.selectImpl(items, isMulti);
	}

	deselect(id: string) {
		const index = this._selectedItems.indexOf(id);
		if (index === -1) {
			return;
		}
		this._selectedItems.splice(index, 1);
	}

	select(id: string, isMulti?: boolean) {
		if (this.isSelected(id)) {
			this.deselect(id);
			return;
		}
		this.selectImpl([id], isMulti);
	}

	isSelected(id: string): boolean {
		return this._selectedItems.indexOf(id) > -1;
	}

	getSelectedItems(): string[] {
		return this._selectedItems;
	}

	private selectImpl(items: string[], isMulti: boolean = false) {
		let selectedItems = items;
		if (isMulti) {
			selectedItems = [...this._selectedItems, ...selectedItems];
		}
		this._selectedItems = selectedItems;
	}
}