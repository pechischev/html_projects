import { INode } from "map/model/node/INode";
import { INodeGroup } from "map/model/node/INodeGroup";
import { Disposable } from "common/component/Disposable";
import { ArrayUtils } from "common/utils/ArrayUtils";
import { Coordinate } from "common/math/Coordinate";

export class NodeList extends Disposable {
	readonly groupEvent = this.createDispatcher();
	readonly ungroupEvent = this.createDispatcher();

	private _nodes: INode[] = [];
	private _groups: string[] = [];

	calculateGroupPosition(children: INode[]): Coordinate {
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

	appendNodes(nodes: INode[] = []) {
		const newNodes = nodes.filter((node: INode) => !this.hasNodeById(node.id()));
		if (!newNodes.length) {
			return;
		}
		this._nodes.push(...newNodes);
	}

	removeNodes(nodes: INode[] = []) {
		nodes.forEach((node: INode) => {
			if (this.isGroup(node.id())) {
				this.removeNodes(this.getChildren(node));
				this.removeGroup(node as INodeGroup);
			}
			const index = this.getNodeIndex(node.id());
			if (index == -1) {
				return;
			}
			this._nodes.splice(index, 1);
		});
	}

	nodes(): INode[] {
		return this._nodes;
	}

	group(items: INode[], group: INodeGroup) {
		const length = items.length;
		if (!length) {
			return;
		}

		const parents = ArrayUtils.uniq(items.map((item) => this.getParent(item))).filter((value) => !!value);
		if (parents.length > 1) {
			throw new Error("There should be only one parent");
		}
		const parent = parents[0];
		if (parent) {
			parent.removeChildren(items.slice());
			parent.appendChildren([group]);
		}

		group.appendChildren(items);

		this.appendNodes([group]);

		this._groups.push(group.id());
		this.groupEvent.dispatch([group], items);
	}

	ungroup(groups: INodeGroup[]) {
		const length = groups.length;
		if (!length) {
			return;
		}
		for (const group of groups) {
			this.removeGroup(group);

			const children = this.getChildren(group);
			group.removeChildren(children);

			const parent = this.getParent(group);
			if (parent) {
				parent.removeChildren([group]);
				parent.appendChildren(children);
			}

			this.ungroupEvent.dispatch(parent ? [] : children, [group]);
		}
		this.removeNodes(groups);
	}

	getGroupNodes(): INodeGroup[] {
		return this._nodes.filter((node: INode) => this.isGroup(node.id())) as INodeGroup[];
	}

	getChildren(group: INode): INode[] {
		const groupItem = this.getNodeById(group.id()) as INodeGroup;
		if (!groupItem) {
			return [];
		}
		return groupItem.children().map((id: string) => this.getNodeById(id));
	}

	isGroup(id: string): boolean {
		return this._groups.indexOf(id) > -1;
	}

	getParent(child: INode): INodeGroup|null {
		if (!child.parent()) {
			return null;
		}
		return this.getNodeById(child.parent()) as INodeGroup;
	}

	getNodeById(id: string): INode|null  {
		const index = this.getNodeIndex(id);
		const node = this._nodes[index];
		return node || null;
	}

	getNodesById(ids: string[]): INode[] {
		return this._nodes.filter((node) => ids.indexOf(node.id()) > -1);
	}

	move(node: INode, position: Coordinate) {
		const isEmptyCell = !this.getNodeByPosition(position);
		if (!isEmptyCell) {
			position = node.position();
		}
		node.setPosition(position);
	}

	getNodeByPosition(position: Coordinate): INode|null {
		const nodes = this.nodes();
		return nodes.filter((node) => !node.parent()).find((node) => position.equals(node.position())) || null;
	}

	private hasNodeById(id: string): boolean {
		return this.getNodeIndex(id) > -1;
	}

	private getNodeIndex(id: string): number {
		return this._nodes.findIndex((node: INode) => node.id() == id);
	}

	private removeGroup(group: INodeGroup) {
		const index = this._groups.indexOf(group.id());
		if (index < 0) {
			return;
		}
		this._groups.splice(index, 1);
	}
}
