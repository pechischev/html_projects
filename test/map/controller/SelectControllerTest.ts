import { expect } from "chai";
import { SelectionController } from "map/controller/SelectionController";

describe("SelectionController", () => {
	let controller: SelectionController;

	beforeEach(() => {
		controller = new SelectionController();
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

	describe("deselect", () => {
		it("should deselect item if item was selected", () => {
			controller.select("1");
			expect(controller.getSelectedItems()).to.deep.equals(["1"]);
			controller.deselect("1");
			expect(controller.getSelectedItems()).to.deep.equals([]);
		});

		it("should not deselect item if item was not selected", () => {
			controller.select("1");
			expect(controller.getSelectedItems()).to.deep.equals(["1"]);
			controller.deselect("2");
			expect(controller.getSelectedItems()).to.deep.equals(["1"]);
		});
	});

	describe("setSelection", () => {
		it("should select several items", () => {
			controller.setSelection(["1", "2", "3", "4"]);
			expect(controller.getSelectedItems()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should replace selection", () => {
			controller.setSelection(["1", "2"]);
			controller.setSelection(["3", "4"]);
			expect(controller.getSelectedItems()).to.deep.equals(["3", "4"]);
		});

		it("should append selection by multiselect mode", () => {
			expect(controller.getSelectedItems()).to.deep.equals([]);
			controller.setSelection(["1", "2"], true);
			controller.setSelection(["3", "4"], true);
			expect(controller.getSelectedItems()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should reset selection if is no items", () => {
			controller.setSelection(["1", "2"]);
			controller.setSelection([]);
			expect(controller.getSelectedItems()).to.deep.equals([]);
		});
	});
});