import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";

export class NodeView extends Konva.Group {
	private _node: INode;
	private _selected = false;
	private _rect: Konva.Rect;

	constructor(item: INode) {
		super({
			draggable: true
		});
		this._node = item;

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
		return this._node.id();
	}

	node(): INode {
		return this._node;
	}

	setSelected(selected: boolean) {
		this._selected = selected;
		this._rect.stroke(selected ? "#58A8F7" : "#D5D5D5");
		this.draw();
	}

	selected(): boolean {
		return this._selected;
	}

	setPosition(position: Coordinate) {
		const offsetX = 15;
		const offsetY = 5;
		this.x(position.x + offsetX);
		this.y(position.y + offsetY);
	}
}