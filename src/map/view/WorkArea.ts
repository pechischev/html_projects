import { Component } from "common/component/Component";
import * as Konva from "konva";
import { INode } from "map/model/node/INode";

let count = 1;

export class WorkArea extends Component {
	private _layer =  new Konva.Layer();

	constructor() {
		super({blockName: "work-area"});

		const stage = new Konva.Stage({
			container: this.element(),
		});

		stage.add(this._layer);

		window.addEventListener("DOMContentLoaded", () => {
			stage.setWidth(this.width());
			stage.setHeight(this.height());
		});
	}

	createNode(node: INode) {
		const rect = new Konva.Rect({
			height: 100,
			width: 120,
			fill: "white",
			stroke: "black",
			strokeWidth: 2
		});

		const simpleText = new Konva.Text({
			x: 20,
			y: 20,
			text: `${node.content().title()} ${count}`,
			fontSize: 20,
		});

		const offset = count * 50;

		const group = new Konva.Group({
			x: offset,
			y: offset
		});

		group.add(rect);
		group.add(simpleText);

		count++;

		this._layer.add(group);
		this._layer.draw();
	}
}