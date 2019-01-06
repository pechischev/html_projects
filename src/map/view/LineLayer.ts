import { Layer } from "common/canvas/Layer";
import { LinkLine } from "map/view/item/LinkLine";
import { ILink } from "map/model/link/ILink";

export class LineLayer extends Layer<LinkLine> {

	drawLine(link: ILink) {
		const line = new LinkLine(link);
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

	private getLineByLink(link: ILink): LinkLine {
		return this._items.find((item) => {
			return item.link() == link;
		});
	}
}