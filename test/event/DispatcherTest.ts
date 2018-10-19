import { expect } from "chai";
import { spy } from "sinon";
import { Dispatcher } from "common/event/Dispatcher";

describe("Dispatchert", () => {
	let dispatcher;

	beforeEach(() => {
		dispatcher = new Dispatcher();
	});

	describe("addListener", () => {
		it("should add listener", () => {
			dispatcher.addListener(() => void 0);
			expect(dispatcher._listeners.length).to.be.equal(1);
		});

		it("should not add listener if this listener was added", () => {
			const callback = () => void 0;
			dispatcher.addListener(callback);
			dispatcher.addListener(callback);
			expect(dispatcher._listeners.length).to.be.equal(1);
		});

		it("should add some listeners", () => {
			dispatcher.addListener(() => void 0);
			dispatcher.addListener(() => void 0);
			dispatcher.addListener(() => void 0);

			const expectedCountListeners = 3;
			expect(dispatcher._listeners.length).to.be.equal(expectedCountListeners);
		});

		it("not should add object as listener", () => {
			dispatcher.addListener({});
			expect(dispatcher._listeners.length).to.be.equal(0);
		});
	});

	describe("removeListener", () => {
		it("should remove listener", () => {
			const callback = () => void 0;
			dispatcher.addListener(callback);
			dispatcher.removeListener(callback);

			expect(dispatcher._listeners.length).to.be.equal(0);
		});

		it("should remove listener from the list", () => {
			const callback1 = () => void 0;
			const callback2 = () => void 0;
			const callback3 = () => void 0;

			dispatcher.addListener(callback1);
			dispatcher.addListener(callback2);
			dispatcher.addListener(callback3);

			dispatcher.removeListener(callback1);

			expect(dispatcher._listeners.length).to.be.equal(2);
		});
	});

	describe("dispatch", () => {
		it("should call function", () => {
			const callback = spy();
			dispatcher.addListener(callback);
			dispatcher.dispatch();

			expect(callback.callCount).to.be.equal(1);
		});

		it("should call functions when callack was added later", () => {
			const callback1 = spy();
			const callback2 = spy();
			dispatcher.addListener(callback1, this);
			dispatcher.dispatch();

			dispatcher.addListener(callback2, this);
			dispatcher.dispatch();

			expect(callback1.callCount).to.be.equal(2);
			expect(callback2.callCount).to.be.equal(1);
		});
	});
});