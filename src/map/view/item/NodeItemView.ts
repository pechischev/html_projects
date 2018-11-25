import * as Konva from "konva";
import { INode } from "map/model/node/INode";

export class NodeItemView extends Konva.Group {
	private _item: INode;
	private _selected = false;
	private _rect: Konva.Rect;

	constructor(item: INode) {
		super({
			draggable: true
		});
		this._item = item;

		this._rect = new Konva.Rect({
			height: 100,
			width: 120,
			fill: "white",
			stroke: "#D5D5D5",
			strokeWidth: 2,
			cornerRadius: 10
		});

		const simpleText = new Konva.Text({
			x: 20,
			y: 20,
			text: item.content().title(),
			fontSize: 20,
		});

		this.add(this._rect);
		this.add(simpleText);

		// add cursor styling
		this.on("dragstart dragend mouseover", () => {
			document.body.style.cursor = "grab";
		});
		this.on("dragmove", () => {
			document.body.style.cursor = "grabbing";
		});
		this.on("mouseout", () => {
			document.body.style.cursor = "default";
		});
	}

	getId(): string {
		return this._item.id();
	}

	setSelected(selected: boolean) {
		this._selected = selected;
		this._rect.stroke(selected ? "#58A8F7" : "#D5D5D5");
		this.draw();
	}

	selected(): boolean {
		return this._selected;
	}
}