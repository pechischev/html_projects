import * as Konva from "konva";
import { Component } from "common/component/Component";
import { INode } from "map/model/node/INode";
import { NodeItemView } from "map/view/item/NodeItemView";
import { SelectionPresenter } from "map/controller/SelectionPresenter";

export class WorkArea extends Component {
	private _layer =  new Konva.Layer();
	private _shapes: NodeItemView[] = [];
	private _selectionList: SelectionPresenter = null;

	constructor() {
		super({blockName: "work-area"});

		const stage = new Konva.Stage({
			container: this.element(),
			name: "stage"
		});
		stage.add(this._layer);
		stage.on("click", (event) => {
			if (event.target.name() != stage.name()) {
				return;
			}
			this._selectionList.setSelection([]);
		});

		window.addEventListener("DOMContentLoaded", () => {
			stage.setWidth(this.width());
			stage.setHeight(this.height());
		});
	}

	setSelectionList(list: SelectionPresenter) {
		this._selectionList = list;
		this.addListener(this._selectionList.changeSelectionEvent(), this.updateSelection, this);
	}

	invalidate() {
		for (const shape of this._shapes) {
			this._layer.add(shape);
			this._layer.draw();
		}
	}

	createNode(node: INode) {
		const shape = new NodeItemView(node);
		shape.on("click", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this._selectionList.setSelection([node.id()], isCtrl);
		});
		shape.x(Math.random() * (1000 - 10) + 10);
		shape.y(Math.random() * (1000 - 10) + 10);
		this._shapes.push(shape);

		this._layer.add(shape);
		this._layer.draw();
	}

	private updateSelection() {
		this._shapes.forEach((shape) => {
			shape.setSelected(this._selectionList.isSelected(shape.getId()));
		});
	}

}