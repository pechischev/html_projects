import { expect } from "chai";
import { NodePresenter } from "map/controller/NodePresenter";
import { NodeItem } from "map/model/node/NodeItem";
import { INode } from "map/model/node/INode";
import { INodeGroup } from "map/model/node/INodeGroup";
import { SelectionList } from "map/controller/SelectionList";

// tslint:disable
describe("NodePresenter", () => {
	let list: NodePresenter;

	function createNodes(count: number): NodeItem[] {
		const nodes = [];
		for (let i = 0; i < count; ++i) {
			nodes.push(new NodeItem());
		}
		return nodes;
	}

	function appendNodesToList(count: number): INode[] {
		const nodes = createNodes(count);
		list.appendNodes(nodes);
		return nodes;
	}

	beforeEach(() => {
		list = new NodePresenter(new SelectionList());
	});

	it("empty list ", () => {
		expect(list.nodes()).to.deep.equals([]);
		expect(list.getSelection()).to.deep.equals([]);
	});

	describe("appendNodes", () => {
		it("should add node and select it", () => {
			const node = new NodeItem();
			list.appendNodes([node]);
			expect(list.nodes()).to.deep.equals([node]);
			expect(list.getSelection()).to.deep.equals([node]);
		});

		it("not should add node if node was added", () => {
			const node = new NodeItem();
			list.appendNodes([node]);
			list.appendNodes([node]);
			expect(list.nodes()).to.deep.equals([node]);
			expect(list.getSelection()).to.deep.equals([node]);
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
			expect(list.getSelection().length).to.be.equal(count);
		});

		it("should added nodes which no contains in list", () => {
			const node = new NodeItem();
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
			expect(list.getSelection()).to.deep.equals([nodes[1], nodes[2], nodes[4]]);
		});

		it("should reset select items if this items was selected", () => {
			const nodes = createNodes(5);
			list.appendNodes(nodes);
			expect(list.getSelection().length).to.be.equal(5);
			list.setSelection([]);
			expect(list.getSelection().length).to.be.equal(0);
		});
	});

	it("empty groups after constructs", () => {
		expect(list.getGroupNodes().length).to.be.equal(0);
	});

	describe("group", () => {
		it("not should group items when they wasn't selected", function () {
			const nodes = appendNodesToList(2);
			list.group([]);
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("should group items when they was selected", () => {
			const nodes = appendNodesToList(2);
			list.group(nodes);
			expect(list.getGroupNodes().length).to.be.equal(1);
			expect(list.getChildren(list.getGroupNodes()[0])).to.deep.equals(nodes);
		});

		it("should select new group content", function () {
			const nodes = appendNodesToList(2);
			list.group(nodes);
			const group = list.getGroupNodes()[0];
			expect(list.getSelection()).to.deep.equals([group]);
		});

		it("should append group to nodes list", () => {
			const nodes = appendNodesToList(2);
			expect(list.nodes().length).to.be.equal(2);
			list.group(nodes);
			expect(list.nodes().length).to.be.equal(3);
		});

		it("should group items when they located inside the group", () => {
			const nodes = appendNodesToList(5);
			list.group([nodes[0], nodes[1], nodes[2]]);

			const parentGroup = list.getGroupNodes()[0] as INodeGroup;
			list.group(list.getChildren(parentGroup), parentGroup);

			expect(list.getGroupNodes().length).to.be.equal(2);

			const childGroup = list.getGroupNodes()[1];

			expect(list.getChildren(parentGroup)).to.deep.equals([childGroup]);
			expect(parentGroup.contains(childGroup)).to.be.true;
			expect(list.getChildren(childGroup)).to.deep.equals([nodes[0], nodes[1], nodes[2]]);
		});

		it("should group items with other group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]]);

			const childGroup = list.getGroupNodes()[0];
			list.group([nodes[3], childGroup]);
			expect(list.getGroupNodes().length).to.be.equal(2);
			const parentGroup = list.getGroupNodes()[1];
			expect(parentGroup.contains(childGroup)).to.be.true;
		});
	});

	describe("ungroup", () => {
		it("should ungroup item if it is group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]]);
			list.ungroup(list.getGroupNodes());

			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("not should ungroup item if selected item is not group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]]);
			list.ungroup([]);
			expect(list.getGroupNodes().length).to.be.equal(1);
		});

		it("should ungroup some items", () => {
			const nodes = appendNodesToList(6);
			list.group([nodes[0], nodes[1]]);
			list.group([nodes[2], nodes[3]]);
			expect(list.getGroupNodes().length).to.be.equal(2);
			list.ungroup(list.getGroupNodes());
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("should remove group from nodes list", function () {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]]);
			list.ungroup(list.getGroupNodes());
			expect(list.nodes().length).to.be.equal(4);
		});

		it("should ungroup group when group are located in parent group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]]);
			const childGroup = list.getGroupNodes()[0];
			list.group([nodes[3], childGroup]);
			const parentGroup = list.getGroupNodes()[1];
			list.ungroup([childGroup], parentGroup);
			expect(list.getGroupNodes().length).to.be.equal(1);
			expect(parentGroup.contains(childGroup)).to.be.false;
			expect(list.getChildren(parentGroup).length).to.be.equal(4);
		});

		it("should ungroup group when group are located other group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]]);
			const childGroup = list.getGroupNodes()[0];
			list.group([nodes[3], childGroup]);
			const parentGroup = list.getGroupNodes()[1];
			list.ungroup([parentGroup]);
			expect(list.getGroupNodes().length).to.be.equal(1);
			expect(list.getChildren(parentGroup).length).to.be.equal(0);
			expect(childGroup.parent()).to.be.null;
		});
	});

	describe("removeNodes", () => {
		it("should remove node", () => {
			const node = new NodeItem();
			list.appendNodes([node]);
			expect(list.nodes().length).to.be.equal(1);
			list.removeNodes([node]);
			expect(list.nodes().length).to.be.equal(0);
		});

		it("should deselect node when node was removed", () => {
			const node = new NodeItem();
			list.appendNodes([node]);
			expect(list.getSelection().length).to.be.equal(1);
			list.removeNodes([node]);
			expect(list.getSelection().length).to.be.equal(0);
		});

		it("not should remove no contains node", () => {
			const node = new NodeItem();
			appendNodesToList(2);
			list.removeNodes([node]);
			expect(list.nodes().length).to.be.equal(2);
		});

		it("should remove some nodes", () => {
			const nodes = appendNodesToList(2);
			list.removeNodes(nodes);
			expect(list.nodes().length).to.be.equal(0);
		});

		it("should remove group with children", () => {
			const nodes = appendNodesToList(5);
			list.group([nodes[0], nodes[1], nodes[2]]);
			list.removeNodes(list.getGroupNodes());
			expect(list.nodes().length).to.be.equal(2);
		});
	});
});
