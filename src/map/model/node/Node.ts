import { AbstractNode } from "./AbstractNode";

export class Node extends AbstractNode {
	private _type = "";

	setType(type: string) {
		this._type = type;
	}

	type(): string {
		return this._type;
	}
}