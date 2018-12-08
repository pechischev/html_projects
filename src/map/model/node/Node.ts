import { Utils } from "common/utils/Utils";
import { IContent } from "map/model/content/IContent";
import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { INode } from "./INode";

export abstract class Node extends Disposable implements INode {
	readonly changedPositionEvent = this.createDispatcher();
	readonly changeParentEvent = this.createDispatcher();

	protected _parent?: string = null;
	protected _content?: IContent = null;
	protected _position = new Coordinate();
	private readonly _id;

	constructor(id?: string) {
		super();
		this._id = id || Utils.getUid(this);
	}

	id(): string {
		return this._id;
	}

	setParent(id: string = null) {
		if (this._parent == id) {
			return;
		}
		this._parent = id;
		this.changeParentEvent.dispatch();
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

	setPosition(position: Coordinate) {
		this._position = position;
		this.changedPositionEvent.dispatch();
	}

	position(): Coordinate {
		return this._position;
	}
}
