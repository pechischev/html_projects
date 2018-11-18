export class BemInfo {
	private _blockName: string;
	private _elementName: string|void;
	private _modifiers = new Map<string, string|boolean|number>();

	constructor(blockName: string, elementName?: string) {
		this._blockName = blockName;
		this._elementName = elementName;
	}

	updateModifier(modifier: string, value: string|boolean|number) {
		this._modifiers.set(modifier, value);
	}

	getClassName(): string {
		let className = this.getElementName();
		for (const modifier of this._modifiers.keys()) {
			className += ` ${this.getElementName()}${this.getModifier(modifier)}`;
		}
		return className;
	}

	blockName(): string {
		return this._blockName;
	}

	private getElementName(): string {
		return this._elementName ? `${this._blockName}__${this._elementName}` : this._blockName;
	}

	private getModifier(modifier: string): null|string {
		if (!this._modifiers.has(modifier)) {
			return null;
		}
		const modifierValue = this._modifiers.get(modifier);
		if (!!modifierValue) {
			return !!modifierValue ? `_${modifier}` : "";
		}
		return `_${modifier}_${modifierValue}`;
	}
}