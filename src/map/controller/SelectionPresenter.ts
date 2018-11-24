import { Disposable } from "common/component/Disposable";
import { IDispatcher } from "common/event/IDispatcher";

export class SelectionPresenter extends Disposable {
	private _selectedItems: string[] = [];
	private _changeSelectionEvent = this.createDispatcher();

	changeSelectionEvent(): IDispatcher {
		return this._changeSelectionEvent;
	}

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
		this._changeSelectionEvent.dispatch();
	}
}