import { expect } from "chai";
import { NodePresenter } from "map/controller/NodePresenter";
import { Node } from "map/model/node/Node";
import { INode } from "map/model/node/INode";
import { INodeGroup } from "map/model/node/INodeGroup";

// tslint:disable
describe("NodePresenter", () => {
	let list: NodePresenter;

	function createNodes(count: number): Node[] {
		const nodes = [];
		for (let i = 0; i < count; ++i) {
			nodes.push(new Node());
		}
		return nodes;
	}

	function appendNodesToList(count: number): INode[] {
		const nodes = createNodes(count);
		list.appendNodes(nodes);
		return nodes;
	}

	function runAction(selection: INode[], handler: (nodes: INode[]) => void) {
		list.setSelection(selection);
		handler(selection);
	}

	beforeEach(() => {
		list = new NodePresenter();
	});

	it("empty list ", () => {
		expect(list.nodes()).to.deep.equals([]);
		expect(list.selection()).to.deep.equals([]);
	});

	describe("appendNodes", () => {
		it("should add node and select it", () => {
			const node = new Node();
			list.appendNodes([node]);
			expect(list.nodes()).to.deep.equals([node]);
			expect(list.getSelectionNodes()).to.deep.equals([node]);
		});

		it("not should add node if node was added", () => {
			const node = new Node();
			list.appendNodes([node]);
			list.appendNodes([node]);
			expect(list.nodes()).to.deep.equals([node]);
			expect(list.getSelectionNodes()).to.deep.equals([node]);
		});

		it("should add several nodes", () => {
			const nodes = createNodes(2);
			list.appendNodes(nodes);
			expect(list.nodes().length).to.be.equal(2);
		});

		it("should select added nodes", () => {
			const count = 3;
			const nodes = createNodes(count);
			list.appendNodes(nodes);
			expect(list.selection().length).to.be.equal(count);
		});

		it("should added nodes which no contains in list", () => {
			const node = new Node();
			list.appendNodes([node]);
			expect(list.nodes().length).to.be.equal(1);

			const nodes = createNodes(2);
			list.appendNodes([node, ...nodes]);
			const expectedCount = 3;
			expect(list.nodes().length).to.be.equal(expectedCount);
		});
	});

	describe("setSelection", () => {
		it("should set new select items", () => {
			const nodes = createNodes(5);
			list.appendNodes(nodes);
			list.setSelection([nodes[1], nodes[2], nodes[4]]);
			expect(list.getSelectionNodes()).to.deep.equals([nodes[1], nodes[2], nodes[4]]);
		});

		it("should reset select items if this items was selected", () => {
			const nodes = createNodes(5);
			list.appendNodes(nodes);
			expect(list.selection().length).to.be.equal(5);
			list.setSelection([]);
			expect(list.selection().length).to.be.equal(0);
		});
	});

	it("empty groups after constructs", () => {
		expect(list.getGroupNodes().length).to.be.equal(0);
	});

	describe("group", () => {
		it("not should group items if nodes wasn't selected", function () {
			const nodes = appendNodesToList(2);
			list.setSelection([]);
			runAction([], () => list.group());
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("not should group items if nodes was selected less 2", () => {
			const nodes = appendNodesToList(1);
			runAction(nodes, () => list.group());
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("should group items if nodes was selected", () => {
			const nodes = appendNodesToList(2);
			runAction(nodes, () => list.group());
			expect(list.getGroupNodes().length).to.be.equal(1);
			expect(list.getChildrenByGroup(list.getGroupNodes()[0])).to.deep.equals(nodes);
		});

		it("should select new group item", function () {
			const nodes = appendNodesToList(2);
			runAction(nodes, () => list.group());
			const group = list.getGroupNodes()[0];
			expect(list.getSelectionNodes()).to.deep.equals([group]);
		});

		it("should append group to nodes list", () => {
			const nodes = appendNodesToList(2);
			expect(list.nodes().length).to.be.equal(2);
			runAction(nodes, () => list.group());
			expect(list.nodes().length).to.be.equal(3);
		});

		it("should group items if this items inside the group", () => {
			const nodes = appendNodesToList(5);
			runAction([nodes[0], nodes[1], nodes[2]], () => list.group());

			const group1 = list.getGroupNodes()[0] as INodeGroup;
			runAction(list.getChildrenByGroup(group1), () => list.group());

			expect(list.getGroupNodes().length).to.be.equal(2);

			const group2 = list.getGroupNodes()[1];

			expect(list.getChildrenByGroup(group1)).to.deep.equals([group2]);
			expect(group1.contains(group2)).to.be.true;
			expect(list.getChildrenByGroup(group2)).to.deep.equals([nodes[0], nodes[1], nodes[2]]);
		});

		it("should group items with other group", () => {
			const nodes = appendNodesToList(4);
			runAction([nodes[0], nodes[1], nodes[2]], () => list.group());
			const group1 = list.getGroupNodes()[0];

			runAction([nodes[3], group1], () => list.group());
			expect(list.getGroupNodes().length).to.be.equal(2);
			const group2 = list.getGroupNodes()[1] as INodeGroup;

			expect(group2.contains(group1)).to.be.true;
		});
	});

	describe("ungroup", () => {
		it("should ungroup item if item is group", () => {
			const nodes = appendNodesToList(4);
			runAction([nodes[0], nodes[1], nodes[2]], () => list.group());
			runAction(list.getGroupNodes(), () => list.ungroup());
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("not should ungroup item if selected item is not group", () => {
			const nodes = appendNodesToList(4);
			runAction([nodes[0], nodes[1], nodes[2]], () => list.group());
			runAction([], () => list.ungroup());
			expect(list.getGroupNodes().length).to.be.equal(1);
		});

		it("should ungroup some items", () => {
			const nodes = appendNodesToList(6);
			runAction([nodes[0], nodes[1]], () => list.group());
			runAction([nodes[2], nodes[3]], () => list.group());
			expect(list.getGroupNodes().length).to.be.equal(2);
			runAction(list.getGroupNodes(), () => list.ungroup());
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("should remove group from nodes list", function () {
			const nodes = appendNodesToList(4);
			runAction([nodes[0], nodes[1], nodes[2]], () => list.group());
			runAction(list.getGroupNodes(), () => list.ungroup());
			expect(list.nodes().length).to.be.equal(4);
		});

		it("should ungroup group when group are located in parent group", () => {

		});
	});

	describe("removeNodes", () => {
		it("should remove node", () => {
			const node = new Node();
			list.appendNodes([node]);
			expect(list.nodes().length).to.be.equal(1);
			list.removeNodes([node]);
			expect(list.nodes().length).to.be.equal(0);
		});

		it("should deselect node when node was removed", () => {
			const node = new Node();
			list.appendNodes([node]);
			expect(list.selection().length).to.be.equal(1);
			list.removeNodes([node]);
			expect(list.selection().length).to.be.equal(0);
		});

		it("not should remove no contains node", () => {
			const node = new Node();
			list.appendNodes(createNodes(2));
			list.removeNodes([node]);
			expect(list.nodes().length).to.be.equal(2);
		});

		it("should remove some nodes", () => {
			const nodes = createNodes(2);
			list.appendNodes(nodes);
			list.removeNodes(nodes);
			expect(list.nodes().length).to.be.equal(0);
		});
	});
});
