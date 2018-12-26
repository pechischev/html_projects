import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { EditableText } from "map/view/EditableText";
import { AbstractShape } from "common/canvas/Shape";
import { Config } from "map/config/Config";

export class NodeView extends AbstractShape<Konva.Group> {
	private _node: INode;
	private _rect: Konva.Rect;

	constructor(item: INode) {
		super();
		this._node = item;

		this.shape().id(item.id());

		const offsetX = (Config.CELL_WIDTH - Config.NODE_WIDTH) / 2;
		const offsetY = (Config.CELL_HEIGHT - Config.NODE_HEIGHT) / 2;

		const main = new Konva.Rect({
			width: Config.CELL_WIDTH,
			height: Config.CELL_HEIGHT,
			preventDefault: false
		});

		this._rect = new Konva.Rect({
			height: Config.NODE_HEIGHT,
			width: Config.NODE_WIDTH,
			fill: "white",
			stroke: "#D5D5D5",
			strokeWidth: 2,
			cornerRadius: 10,
			offsetX: -offsetX,
			offsetY: -offsetY
		});

		const content = item.content();
		const textField = new EditableText(content.title());
		textField.align("center");
		textField.verticalAlign("middle");
		textField.setSize(this._rect.getSize());
		textField.offsetX(-offsetX);
		textField.offsetY(-offsetY);
		this.addListener(textField.changedValue, (value: string) => content.setTitle(value));
		this.addListener(content.changedTitle, () => {
			textField.text(content.title());
			this.updateEvent.dispatch();
		});

		const shape = this.shape();
		shape.add(main);
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

	protected createShape(): Konva.Group {
		return new Konva.Group({
			draggable: true,
		});
	}

	protected setSelectedImpl(selected: boolean) {
		this._rect.stroke(selected ? "#58A8F7" : "#D5D5D5");
	}
}