import { expect } from "chai";
import { SelectController } from "map/controller/SelectController";

describe("SelectController", () => {
	let controller: SelectController;

	beforeEach(() => {
		controller = new SelectController();
	});

	describe("select", () => {
		it("should select item", () => {
			controller.select("1");
			expect(controller.getSelectedItems()).to.deep.equals(["1"]);
		});

		it("should deselect item if this item was selected again", () => {
			controller.select("1");
			expect(controller.getSelectedItems()).to.deep.equals(["1"]);
			controller.select("1");
			expect(controller.getSelectedItems()).to.deep.equals([]);
		});

		it("should select other item", () => {
			controller.select("1");
			expect(controller.getSelectedItems()).to.deep.equals(["1"]);
			controller.select("2");
			expect(controller.getSelectedItems()).to.deep.equals(["2"]);
		});

		it("should select several items", () => {
			const itemsCount = 5;
			for (let i = 1; i < itemsCount; ++i) {
				controller.select(`${i}`, true);
			}
			expect(controller.getSelectedItems()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should remove multiple items from selected items", () => {
			const itemsCount = 5;
			for (let i = 1; i < itemsCount; ++i) {
				controller.select(`${i}`, true);
			}
			controller.select("2", true);
			controller.select("3", true);
			expect(controller.getSelectedItems()).to.deep.equals(["1", "4"]);
		});
	});
});