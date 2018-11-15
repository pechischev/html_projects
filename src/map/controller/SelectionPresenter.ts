import { Listener } from "common/event/Listener";

export class SelectionPresenter extends Listener {
	private _selectedItems: string[] = [];

	setSelection(items: string[], isMulti?: boolean) {
		this.selectImpl(items, isMulti);
	}

	isSelected(id: string): boolean {
		return this._selectedItems.indexOf(id) > -1;
	}

	getSelection(): string[] {
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