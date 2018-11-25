import * as Konva from "konva";
import { Component } from "common/component/Component";
import { INode } from "map/model/node/INode";
import { NodeItemView } from "map/view/item/NodeItemView";
import { IDispatcher } from "common/event/IDispatcher";

export class WorkArea extends Component {
	private _layer =  new Konva.Layer();
	private _shapes: NodeItemView[] = [];

	private _clickItemEvent = this.createDispatcher();
	private _clickLayerEvent = this.createDispatcher();

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
			this._clickLayerEvent.dispatch();
		});

		window.addEventListener("DOMContentLoaded", () => {
			stage.setWidth(this.width());
			stage.setHeight(this.height());
		});
	}

	clickItemEvent(): IDispatcher {
		return this._clickItemEvent;
	}

	clickLayerEvent(): IDispatcher {
		return this._clickLayerEvent;
	}

	update(appendedNodes: INode[], removedNodes: INode[] = []) {
		removedNodes.forEach((node) => {
			const index = this._shapes.findIndex((shape) => shape.getId() == node.id());
			if (index === -1) {
				return;
			}
			const shape = this._shapes[index];
			shape.destroy();
			this._shapes.splice(index, -1);
		});

		appendedNodes.forEach((node) => {
			this.appendNode(node);
		});

		this._layer.draw();
	}

	invalidate() {
		this._layer.add(...this._shapes);
		this._layer.draw();
	}

	updateSelection(selection: string[]) {
		this._shapes.forEach((shape) => {
			const isSelected = selection.indexOf(shape.getId()) > -1;
			shape.setSelected(isSelected);
		});
	}

	private appendNode(node: INode) {
		const shape = new NodeItemView(node);
		shape.on("click", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this._clickItemEvent.dispatch(node.id(), isCtrl);
		});
		shape.x(Math.random() * 1000);
		shape.y(Math.random() * 700);
		this._shapes.push(shape);

		this._layer.add(shape);
		this._layer.draw();
	}
}