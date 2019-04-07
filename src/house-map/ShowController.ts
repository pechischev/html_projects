import { Utils } from "common/utils/Utils";

export interface IShownItem {
	show: boolean;

	onClose?(): void;
	onOpen?(): void;
}

export class ShowController {
	private items = new Map<string, IShownItem>();

	register(item: IShownItem) {
		const uid = Utils.getUid(item);
		this.items.set(uid, item);
	}


}