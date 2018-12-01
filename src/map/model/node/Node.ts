import { Utils } from "common/utils/Utils";
import { IContent } from "map/model/content/IContent";
import { Disposable } from "common/component/Disposable";
import { INode } from "./INode";

export abstract class Node extends Disposable implements INode {
	protected _parent?: string = null;
	protected _content?: IContent = null;
	private readonly _id;

	constructor(id?: string) {
		super();
		this._id = id || Utils.getUid(this);
	}

	id(): string {
		return this._id;
	}

	setParent(id: string = null) {
		this._parent = id;
	}

	parent(): string|null {
		return this._parent;
	}

	setContent(content: IContent) {
		this._content = content;
	}

	content(): IContent|null {
		return this._content;
	}
}
