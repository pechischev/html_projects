import { expect } from "chai";
import { NodePresenter } from "map/controller/NodePresenter";
import { Node } from "map/model/node/Node";

describe("NodePresenter", () => {
	let list: NodePresenter;

	function createNodes(count: number): Node[] {
		const nodes = [];
		for (let i = 0; i < count; ++i) {
			nodes.push(new Node());
		}
		return nodes;
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
	});

	/*
	 * Логика групп
	 * добавить группу -> группу можно создать из мин 2 узлов
	 * 1) можно добавить другую группу
	 * удаление группы -> полное удаление всех элементов
	 * разруппировка -> группа распадается на узлы, которые содеражала
	 * */

	describe.skip("group", () => {

		it("should be grouped if several nodes was selected", () => {
			const expectedCount = 5;
			expect(list.selection().length).to.be.equal(expectedCount);
			list.group();
			expect(list.getGroupNodes().length).to.be.equal(1);
		});

		it("should not be grouped if one node has been allocated", () => {
			list.group();
			expect(list.getGroupNodes().length).to.be.equal(0);
		});
	});
});
