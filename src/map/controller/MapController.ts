import { NodePresenter } from "map/controller/NodePresenter";
import { SelectionPresenter } from "map/controller/SelectionPresenter";
import { notImplement } from "common/utils/tools";
import { NodeFactory } from "map/controller/factory/NodeFactory";
import { Disposable } from "common/component/Disposable";
import { IDispatcher } from "common/event/IDispatcher";

export class MapController extends Disposable {
	private _selectionList = new SelectionPresenter();
	private _nodeList = new NodePresenter();

	private _createdNodeEvent = this.createDispatcher();
	private _removeEvent = this.createDispatcher();

	createdNodeEvent(): IDispatcher {
		return this._createdNodeEvent;
	}

	removeEvent(): IDispatcher {
		return this._removeEvent;
	}

	selectionList(): SelectionPresenter {
		return this._selectionList;
	}

	connect() {
		notImplement();
	}

	disconnect() {
		notImplement();
	}

	appendNode() {
		const node = NodeFactory.createItem(`Node ${this._nodeList.nodes().length + 1}`);
		this._nodeList.appendNodes([node]);
		this._createdNodeEvent.dispatch(node);
		this._selectionList.setSelection([node.id()]);
	}

	removeNode() {
		const selection = this._selectionList.getSelection();
		const nodes = [];
		for (const id of selection) {
			const node = this._nodeList.getNodeById(id);
			if (node) {
				nodes.push(node);
			}
		}
		this._nodeList.removeNodes(nodes);
		this._removeEvent.dispatch();
	}

	group() {
		notImplement();
	}

	ungroup() {
		notImplement();
	}
}