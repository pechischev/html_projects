import { expect } from "chai";
import { NodeGroup } from "map/model/node/NodeGroup";
import { Node } from "map/model/node/Node";

describe("NodeGroup", () => {
	let group: NodeGroup;

	function expectChildrenCount(count: number) {
		expect(group.children().length).to.be.equal(count);
	}

	beforeEach(() => {
		group = new NodeGroup();
	});

	it("should be empty after constructs", () => {
		expect(group.children().length).to.be.equal(0);
	});

	describe("addChild", () => {
		it("should append node as child", () => {
			group.addChild(new Node());
			expectChildrenCount(1);
		});

		it("should append other group as child", () => {
			group.addChild(new NodeGroup());
			expectChildrenCount(1);
		});

		it("should append some other items to group", () =>  {
			group.addChild(new Node());
			group.addChild(new NodeGroup());
			group.addChild(new Node());
			expectChildrenCount(3);
		});

		it("not should append group if this group was added later", () => {
			const node = new Node();
			group.addChild(node);
			group.addChild(node);
			expectChildrenCount(1);
		});

		it("not should append group to itself", () => {
			group.addChild(group);
			expectChildrenCount(0);
		});
	});

	describe("removeChild", () => {
		it("should remove node from group", () => {
			const node = new Node();
			group.addChild(node);
			expectChildrenCount(1);
			group.removeChild(node);
			expectChildrenCount(0);
		});

		it("should remove other group from parent group", () => {
			const itemGroup = new NodeGroup();
			group.addChild(itemGroup);
			group.removeChild(itemGroup);
			expectChildrenCount(0);
		});

		it("not should remove item if this item no contains in group", function () {
			const node = new Node();
			expectChildrenCount(0);
			group.removeChild(node);
			expectChildrenCount(0);
		});

		it("should remove some other items from group", () =>  {
			const items = [new Node(), new NodeGroup(), new Node()];
			items.forEach((item) => group.addChild(item));
			expectChildrenCount(3);
			items.forEach((item) => group.removeChild(item));
			expectChildrenCount(0);
		});

		it("not should remove group from itself", () => {
			group.removeChild(group);
			expectChildrenCount(0);
		});
	});
});
