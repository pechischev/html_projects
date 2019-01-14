import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { EditableText } from "map/view/EditableText";
import { Group } from "common/canvas/Group";
import { Config } from "map/config/Config";
import { CoordinateConverter } from "map/service/CoordinateConverter";
import { ConnectionFrame } from "map/view/item/ConnectionFrame";

export class NodeView extends Group {
	private _node: INode;
	private _rect: Konva.Rect;

	private _frame: ConnectionFrame;

	constructor(item: INode) {
		super({
			draggable: true,
		});
		this._node = item;

		this.shape().id(item.id());

		const offsetX = (Config.CELL_WIDTH - Config.NODE_WIDTH) / 2;
		const offsetY = (Config.CELL_HEIGHT - Config.NODE_HEIGHT) / 2;

		const main = new Konva.Rect({
			width: Config.CELL_WIDTH,
			height: Config.CELL_HEIGHT,
			preventDefault: false
		});
		this.add(main);

		this._rect = new Konva.Rect({
			height: Config.NODE_HEIGHT,
			width: Config.NODE_WIDTH,
			fill: "white",
			stroke: "#26A092",
			strokeWidth: 1,
			cornerRadius: 10,
			offsetX: -offsetX,
			offsetY: -offsetY
		});
		this.add(this._rect);

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
		this.add(textField);

		const shape = this.shape();

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

		const position = CoordinateConverter.toAbsolute(item.position());
		this.setPosition(position);
		this.addListener(item.changedPositionEvent, () => {
			this.setPosition(CoordinateConverter.toAbsolute(item.position()));
		});
	}

	getId(): string {
		return this._node.id();
	}

	node(): INode {
		return this._node;
	}

	setFrame(frame: ConnectionFrame) {
		this._frame = frame;
		this.addDisposable(frame);
		this.addListener(this.removeEvent, this.dispose, this);
		this.addListener(this.hoverEvent, () => {
			this._frame.setVisible(true);
			this.redraw();
		});
		this.addListener(this.leaveEvent, () => {
			this._frame.setVisible(false);
			this.redraw();
		});
		this._frame.createFrame(this._rect);
		this.add(this._frame);
	}

	frame(): ConnectionFrame {
		return this._frame;
	}

	protected setSelectedImpl(selected: boolean) {
		this._rect.strokeWidth(selected ? 4 : 1);
	}
}