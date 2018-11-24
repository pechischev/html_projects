import { Component } from "common/component/Component";
import { MapController } from "map/controller/MapController";
import { INode } from "map/model/node/INode";
import { Toolbar } from "map/view/Toolbar";
import { WorkArea } from "./WorkArea";

export class MapView extends Component {
	private _controller: MapController;
	private _toolbar = new Toolbar({blockName: "map-toolbar"});

	constructor(controller: MapController) {
		super({blockName: "map"});

		this.addChild(this._toolbar);

		const tools = new Component({blockName: "map-tools"});
		this.addChild(tools);

		const workArea = new WorkArea();
		this.addChild(workArea);

		controller.listen("createNode", (node: INode) => {
			workArea.createNode(node);
		});
	}

	toolbar(): Toolbar {
		return this._toolbar;
	}
}
