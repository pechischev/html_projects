import { INodeItem } from "./INodeItem";
import { Node } from "./Node";

export class NodeItem extends Node implements INodeItem {
	private _type = "";

	setType(type: string) {
		this._type = type;
	}

	type(): string {
		return this._type;
	}
}