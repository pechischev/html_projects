import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { EditableText } from "map/view/EditableText";

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

		const content = item.content();
		const textField = new EditableText(content.title());
		textField.align("center");
		textField.verticalAlign("middle");
		textField.setSize(this._rect.getSize());
		textField.changedValue.addListener((value: string) => content.setTitle(value));
		content.changedTitle.addListener(() => {
			textField.text(content.title());
			this.draw();
		});

		this.add(this._rect);
		this.add(textField);

		// add cursor styling
		this.on("dragstart dragend mouseover mouseup", (event) => {
			event.currentTarget.moveToTop();
			document.body.style.cursor = "grab";
		});
		this.on("dragmove mousedown", () => {
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
		if (position.x == this.x() && position.y == this.y()) {
			return;
		}
		const offsetX = 15;
		const offsetY = 5;
		this.x(position.x + offsetX);
		this.y(position.y + offsetY);
	}
}