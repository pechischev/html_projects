import { Component } from "common/component/Component";
import { Toolbar } from "./Toolbar";
import { WorkArea } from "./WorkArea";

export class MapView extends Component {
	private _toolbar = new Toolbar({blockName: "map-toolbar"});
	private _workArea = new WorkArea();

	constructor() {
		super({blockName: "map"});

		this.addChild(this._toolbar);

		const tools = new Component({blockName: "map-tools"});
		this.addChild(tools);

		this.addChild(this._workArea);
	}

	toolbar(): Toolbar {
		return this._toolbar;
	}

	workArea(): WorkArea {
		return this._workArea;
	}
}
