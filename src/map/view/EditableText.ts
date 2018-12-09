import { TextInput } from "common/component/TextInput";
import { Dispatcher } from "common/event/Dispatcher";
import * as Konva from "konva";

const PADDING = 15;

export class EditableText extends Konva.Text {
	readonly changedValue = new Dispatcher();
	private _inputField = new TextInput("Input text");

	constructor(text: string) {
		super({
			text,
			fontSize: 20,
			ellipsis: true,
			padding: PADDING
		});

		this._inputField.applyBemInfo("editable-field");

		this.on("dblclick", () => {
			document.body.appendChild(this._inputField.element());

			this.updateInputFieldPosition();

			this._inputField.setValue(this.text());
			this._inputField.setWidth(this.width() - PADDING * 2);
			this._inputField.setHeight(this.height() - PADDING * 2);
			this._inputField.element().focus();
		});

		this._inputField.changedEvent.addListener(this.hideField, this);
		this._inputField.blurEvent.addListener(this.hideField, this);
	}

	private updateInputFieldPosition() {
		const textPosition = this.getAbsolutePosition();
		const stageBox = this.getStage().container().getBoundingClientRect();

		const position = {
			x: textPosition.x + stageBox.left + PADDING,
			y: textPosition.y + stageBox.top + PADDING
		};
		this._inputField.setPosition(position.x, position.y);
	}

	private hideField() {
		if (document.body.contains(this._inputField.element())) {
			document.body.removeChild(this._inputField.element());
		}
		this.changedValue.dispatch(this._inputField.value());
	}
}