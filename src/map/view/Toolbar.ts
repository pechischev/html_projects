import { Component } from "common/component/Component";
import { Types } from "common/types/Types";
import { Button } from "common/button/Button";

export class Toolbar extends Component {
	private _buttons: Component[] = [];

	register(action: Types.Handler, name: string) {
		const btn = new Button({content: name});
		btn.clickEvent().addListener(action);
		this._buttons.push(btn);
		this.addChild(btn);
	}
}