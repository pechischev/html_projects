import { expect } from "chai";
import { NodeGroup } from "map/model/node/NodeGroup";
import { NodeItem } from "map/model/node/NodeItem";

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

	describe("appendChildren", () => {
		it("should append node as child", () => {
			group.appendChildren([new NodeItem()]);
			expectChildrenCount(1);
		});

		it("should append other group as child", () => {
			group.appendChildren([new NodeGroup()]);
			expectChildrenCount(1);
		});

		it("should append some other items to group", () =>  {
			group.appendChildren([new NodeItem(), new NodeGroup(), new NodeGroup()]);
			expectChildrenCount(3);
		});

		it("not should append group if this group was added later", () => {
			const node = new NodeItem();
			group.appendChildren([node]);
			group.appendChildren([node]);
			expectChildrenCount(1);
		});

		it("not should append group to itself", () => {
			group.appendChildren([group]);
			expectChildrenCount(0);
		});
	});

	describe("removeChildren", () => {
		it("should remove node from group", () => {
			const node = new NodeItem();
			group.appendChildren([node]);
			expectChildrenCount(1);
			group.removeChildren([node]);
			expectChildrenCount(0);
		});

		it("should remove other group from parent group", () => {
			const itemGroup = new NodeGroup();
			group.appendChildren([itemGroup]);
			group.removeChildren([itemGroup]);
			expectChildrenCount(0);
		});

		it("not should remove content if this content no contains in group", () => {
			const node = new NodeItem();
			expectChildrenCount(0);
			group.removeChildren([node]);
			expectChildrenCount(0);
		});

		it("should remove some other items from group", () =>  {
			const items = [new NodeItem(), new NodeGroup(), new NodeItem()];
			group.appendChildren(items);
			expectChildrenCount(3);
			group.removeChildren(items);
			expectChildrenCount(0);
		});

		it("not should remove group from itself", () => {
			group.removeChildren([group]);
			expectChildrenCount(0);
		});
	});
});
