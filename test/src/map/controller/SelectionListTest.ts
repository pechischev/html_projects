import { expect } from "chai";
import { SelectionList } from "map/controller/SelectionList";

describe("SelectionList", () => {
	let list: SelectionList;

	beforeEach(() => {
		list = new SelectionList();
	});

	describe("setSelection", () => {
		it("should select several items", () => {
			list.setSelection(["1", "2", "3", "4"]);
			expect(list.getSelection()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should replace selection", () => {
			list.setSelection(["1", "2"]);
			list.setSelection(["3", "4"]);
			expect(list.getSelection()).to.deep.equals(["3", "4"]);
		});

		it("should append selection by multiselect mode", () => {
			expect(list.getSelection()).to.deep.equals([]);
			list.setSelection(["1", "2"], true);
			list.setSelection(["3", "4"], true);
			expect(list.getSelection()).to.deep.equals(["1", "2", "3", "4"]);
		});

		it("should reset selection if is no items", () => {
			list.setSelection(["1", "2"]);
			list.setSelection([]);
			expect(list.getSelection()).to.deep.equals([]);
		});
	});
});