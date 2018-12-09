import { expect } from "chai";
import { NodeList } from "map/controller/list/NodeList";
import { NodeItem } from "map/model/node/NodeItem";
import { INode } from "map/model/node/INode";
import { NodeGroup } from "map/model/node/NodeGroup";

// tslint:disable
describe("NodeList", () => {
	let list: NodeList;

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
		list = new NodeList();
	});

	it("empty list ", () => {
		expect(list.nodes()).to.deep.equals([]);
	});

	describe("appendNodes", () => {
		it("should add node", () => {
			const node = new NodeItem();
			list.appendNodes([node]);
			expect(list.nodes()).to.deep.equals([node]);
		});

		it("not should add node if node was added", () => {
			const node = new NodeItem();
			list.appendNodes([node]);
			list.appendNodes([node]);
			expect(list.nodes()).to.deep.equals([node]);
		});

		it("should add several nodes", () => {
			const nodes = createNodes(2);
			list.appendNodes(nodes);
			expect(list.nodes().length).to.be.equal(2);
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

	it("empty groups after constructs", () => {
		expect(list.getGroupNodes().length).to.be.equal(0);
	});

	describe("group", () => {
		it("should append group to nodes list", () => {
			const nodes = appendNodesToList(2);
			expect(list.nodes().length).to.be.equal(2);
			list.group(nodes, new NodeGroup());
			expect(list.nodes().length).to.be.equal(3);
			expect(list.getGroupNodes().length).to.be.equal(1);
		});

		it("should group items when they located inside the group", () => {
			const nodes = appendNodesToList(5);
			const group1 = new NodeGroup();
			list.group([nodes[0], nodes[1], nodes[2]], group1);

			const group2 = new NodeGroup();
			list.group(list.getChildren(group1), group2);

			expect(list.getGroupNodes().length).to.be.equal(2);
			expect(list.getChildren(group1)).to.deep.equals([group2]);
			expect(group1.contains(group2)).to.be.true;
			expect(list.getChildren(group2)).to.deep.equals([nodes[0], nodes[1], nodes[2]]);
		});

		it("should group items with other group", () => {
			const nodes = appendNodesToList(4);
			const group1 = new NodeGroup();
			const group2 = new NodeGroup();
			list.group([nodes[0], nodes[1], nodes[2]], group1);

			list.group([nodes[3], group1], group2);
			expect(list.getGroupNodes().length).to.be.equal(2);
			expect(group2.contains(group1)).to.be.true;
		});
	});

	describe("ungroup", () => {
		it("should ungroup item if it is group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]], new NodeGroup());
			list.ungroup(list.getGroupNodes());

			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("not should ungroup item if item is not group", () => {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]], new NodeGroup());
			list.ungroup([]);
			expect(list.getGroupNodes().length).to.be.equal(1);
		});

		it("should ungroup some items", () => {
			const nodes = appendNodesToList(6);
			list.group([nodes[0], nodes[1]], new NodeGroup());
			list.group([nodes[2], nodes[3]], new NodeGroup());
			expect(list.getGroupNodes().length).to.be.equal(2);
			list.ungroup(list.getGroupNodes());
			expect(list.getGroupNodes().length).to.be.equal(0);
		});

		it("should remove group from nodes list", function () {
			const nodes = appendNodesToList(4);
			list.group([nodes[0], nodes[1], nodes[2]], new NodeGroup());
			list.ungroup(list.getGroupNodes());
			expect(list.nodes().length).to.be.equal(4);
		});

		it("should ungroup group when group are located in parent group", () => {
			const nodes = appendNodesToList(4);
			const group1 = new NodeGroup();
			list.group([nodes[0], nodes[1], nodes[2]], group1);
			const group2 = new NodeGroup();
			list.group([nodes[3], group1], group2);

			list.ungroup([group1]);
			expect(list.getGroupNodes().length).to.be.equal(1);
			expect(group2.contains(group1)).to.be.false;
			expect(list.getChildren(group2).length).to.be.equal(4);
		});

		it("should ungroup group when group are located other group", () => {
			const nodes = appendNodesToList(4);
			const group1 = new NodeGroup();
			list.group([nodes[0], nodes[1], nodes[2]], group1);
			const group2 = new NodeGroup();
			list.group([nodes[3], group1], group2);

			list.ungroup([group2]);
			expect(list.getGroupNodes().length).to.be.equal(1);
			expect(list.getChildren(group2).length).to.be.equal(0);
			expect(group1.parent()).to.be.null;
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
			list.group([nodes[0], nodes[1], nodes[2]], new NodeGroup());
			list.removeNodes(list.getGroupNodes());
			expect(list.nodes().length).to.be.equal(2);
		});
	});
});
