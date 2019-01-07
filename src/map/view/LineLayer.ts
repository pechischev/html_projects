import { Layer } from "common/canvas/Layer";
import { KonvaEventObject } from "konva";
import { LinkLine } from "map/view/item/LinkLine";
import { ILink } from "map/model/link/ILink";

export class LineLayer extends Layer<LinkLine> {
	readonly mouseDownItemEvent = this.createDispatcher();

	drawLine(link: ILink) {
		const line = new LinkLine(link);
		this.addListener(line.clickEvent, (event: KonvaEventObject<MouseEvent>) => {
			const isCtrl = event.evt.ctrlKey;
			this.mouseDownItemEvent.dispatch(link, isCtrl);
		});
		this.drawItem(line);
	}

	removeLine(link: ILink) {
		const view = this.getLineByLink(link);
		if (!view) {
			return;
		}
		view.shape().destroy();
		this._layer.batchDraw();
	}

	updateSelection(selection: string[]) {
		this._items.forEach((shape) => {
			const link = shape.link();
			const isSelected = selection.indexOf(link.id()) > -1;
			shape.setSelected(isSelected);
		});
	}

	private getLineByLink(link: ILink): LinkLine {
		return this._items.find((item) => {
			return item.link().id() == link.id();
		});
	}
}