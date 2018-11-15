import { expect } from "chai";
import { SelectionPresenter } from "map/controller/SelectionPresenter";

describe("SelectionList", () => {
	let controller: SelectionPresenter;

	beforeEach(() => {
		controller = new SelectionPresenter();
	});

	describe("setSelection", () => {
		it("should select several items", () => {
			controller.setSelection(["1", "2", "3", "4"]);
			expect(controller.getSelection()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should replace selection", () => {
			controller.setSelection(["1", "2"]);
			controller.setSelection(["3", "4"]);
			expect(controller.getSelection()).to.deep.equals(["3", "4"]);
		});

		it("should append selection by multiselect mode", () => {
			expect(controller.getSelection()).to.deep.equals([]);
			controller.setSelection(["1", "2"], true);
			controller.setSelection(["3", "4"], true);
			expect(controller.getSelection()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should reset selection if is no items", () => {
			controller.setSelection(["1", "2"]);
			controller.setSelection([]);
			expect(controller.getSelection()).to.deep.equals([]);
		});
	});
});