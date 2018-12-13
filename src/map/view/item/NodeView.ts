import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { EditableText } from "map/view/EditableText";
import { AbstractShape } from "common/canvas/Shape";

let node = null;

export class NodeView extends AbstractShape<Konva.Group> {
	private _node: INode;
	private _rect: Konva.Rect;

	constructor(item: INode) {
		node = item;
		super();
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
		this.addListener(textField.changedValue, (value: string) => content.setTitle(value));
		this.addListener(content.changedTitle, () => {
			textField.text(content.title());
			this.updateEvent.dispatch();
		});

		const shape = this.shape();
		shape.add(this._rect);
		shape.add(textField);

		// add cursor styling
		shape.on("dragstart dragend mouseover mouseup", (event) => {
			event.currentTarget.moveToTop();
			document.body.style.cursor = "grab";
		});
		shape.on("dragmove mousedown", () => {
			document.body.style.cursor = "grabbing";
		});
		shape.on("mouseout", () => {
			document.body.style.cursor = "default";
		});
	}

	getId(): string {
		return this._node.id();
	}

	node(): INode {
		return this._node;
	}

	setPosition(position: Coordinate) {
		const pos = this.position();
		if (position.equals(pos)) {
			return;
		}
		const offsetX = 15;
		const offsetY = 5;
		position.translate(offsetX, offsetY);
		super.setPosition(position);
	}

	protected createShape(): Konva.Group {
		return new Konva.Group({
			draggable: true,
			id: node.id()
		});
	}

	protected setSelectedImpl(selected: boolean) {
		this._rect.stroke(selected ? "#58A8F7" : "#D5D5D5");
	}
}