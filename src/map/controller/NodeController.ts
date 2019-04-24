import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { NodeList } from "map/controller/list/NodeList";
import { SelectionList } from "map/controller/list/SelectionList";
import { NodeFactory } from "map/controller/factory/NodeFactory";
import { INode } from "map/model/node/INode";
import { INodeGroup } from "map/model/node/INodeGroup";

interface ICell {
	id: string;
	position: Coordinate;
	layer: string|null;
}

export class NodeController extends Disposable {
	readonly changedListEvent = this.createDispatcher();
	readonly changedSelectionEvent = this.createDispatcher();

	private _cells: ICell[] = [];
	private _nodeList = new NodeList();
	private _selectionList: SelectionList;

	constructor(selectionList: SelectionList) {
		super();

		this._selectionList = selectionList;

		this.addDisposable(selectionList);
		this.addDisposable(this._nodeList);

		this.addListener(this._nodeList.changedListEvent, (appended: INode[], removed: INode[]) => this.changedListEvent.dispatch(appended, removed));
		this.addListener(this._nodeList.changedListEvent, (appended: INode[]) => this.setSelection(appended));
		this.addListener(this._selectionList.changeSelectionEvent, (selectedItems) => this.changedSelectionEvent.dispatch(selectedItems));
	}

	createNode(position: Coordinate) {
		const node = NodeFactory.createItem();
		this.addListener(node.changeParentEvent, () => this.changeLayer(node));
		this.insert(node, this.getNearestEmptyCell(position));
		this._nodeList.appendNodes([node]);
	}

	removeNodes(nodes: INode[]) {
		this._nodeList.removeNodes(nodes);
		this.removeFromCell(nodes);
	}

	createGroup(nodes: INode[]) {
		const group = NodeFactory.createGroup();
		this.addListener(group.changeParentEvent, () => this.changeLayer(group));
		this._nodeList.group(nodes, group);
		this.insert(group, this.getLeftTopPosition(nodes));
	}

	removeGroup(nodes: INode[]) {
		const groups = nodes.filter((item: INode) => this._nodeList.isGroup(item.id())) as INodeGroup[];
		if (!groups.length) {
			return;
		}
		this.removeFromCell(groups);
		this._nodeList.ungroup(groups);
	}

	insert(item: INode, position: Coordinate) {
		if (!this.isEmptyCell(position, item.parent())) {
			item.setPosition(item.position());
			return;
		}
		let cell = this._cells.find((cell) => cell.id == item.id());
		if (!cell) {
			cell = {id: item.id(), layer: item.parent(), position};
			this._cells.push(cell);
		}
		cell.position = position;
		item.setPosition(position);
	}

	setSelection(nodes: INode[], isMulti: boolean = false) {
		this._selectionList.setSelection(nodes.map((item) => item.id()), isMulti);
	}

	getSelectedNodes(): INode[] {
		const selection = this._selectionList.getSelection();
		return this._nodeList.getNodesById(selection);
	}

	getNodeList(): NodeList {
		return this._nodeList;
	}

	private isEmptyCell(position: Coordinate, layer: string = null): boolean {
		return !this._cells.filter((cell) => cell.layer == layer && Coordinate.equals(position, cell.position)).length;
	}

	private removeFromCell(nodes: INode[]) {
		for (const node of nodes) {
			const index = this._cells.findIndex((cell) => cell.id == node.id());
			if (index == -1) {
				return;
			}
			this._cells.splice(index, 1);
		}
	}

	private changeLayer(item: INode) {
		const cell = this._cells.find((cell) => cell.id == item.id());
		if (!cell) {
			throw new Error("Cell isn't exist");
		}
		const position = this.getNearestEmptyCell(item.position(), item.parent());
		cell.layer = item.parent();
		this.insert(item, position);
	}

	private getNearestEmptyCell(position: Coordinate, layer: string = null): Coordinate {
		const visited = [];
		const isEmpty = (pos: Coordinate) => {
			return this.isEmptyCell(pos, layer);
		};
		const next = (pos: Coordinate, visited: Coordinate[]): Coordinate => {
			if (visited.indexOf(pos) > -1) {
				return null;
			}
			if (isEmpty(pos)) {
				return pos;
			}
			visited.push(pos);
			if (pos.x < 0 || pos.y < 0) {
				return null;
			}
			return next(pos.translate(1, 0), visited)
				|| next(pos.translate(0, -1), visited)
				|| next(pos.translate(-1, 0), visited)
				|| next(pos.translate(0, 1), visited);
		};
		return next(position, visited);
	}

	private getLeftTopPosition(children: INode[]): Coordinate {
		let pos: Coordinate = null;
		for (const child of children) {
			const itemPosition = child.position();
			if (!pos) {
				pos = itemPosition;
				continue;
			}
			const isLeft = pos.x > itemPosition.x;
			const isTop = pos.y > itemPosition.y;
			if (isLeft && isTop) {
				pos = itemPosition;
			} else if (isLeft) {
				pos = itemPosition;
			}
		}
		return pos;
	}
}