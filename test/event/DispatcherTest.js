import { expect } from "chai";
import { spy } from "sinon";
import Dispatcher from "../../src/common/event/Dispatcher";

describe("EventDispatcherTest", () => {
	let dispatcher;

	beforeEach(() => {
		dispatcher = new Dispatcher();
	});

	describe("addListener", () => {
		it("should add listener", () => {
			dispatcher.addListener(() => {});
			expect(dispatcher._listeners.length).to.be.equal(1);
		});

		it("should not add listener if this listener was added", () => {
			const callback = () => {};
			dispatcher.addListener(callback);
			dispatcher.addListener(callback);
			expect(dispatcher._listeners.length).to.be.equal(1);
		});

		it("should add some listeners", () => {
			dispatcher.addListener(() => {});
			dispatcher.addListener(() => {});
			dispatcher.addListener(() => {});
			expect(dispatcher._listeners.length).to.be.equal(3);
		});
	});

	describe("removeListener", () => {
		it("should remove listener", () => {
			const callback = () => {};
			dispatcher.addListener(callback);
			dispatcher.removeListener(callback);

			expect(dispatcher._listeners.length).to.be.equal(0);
		});

		it("should remove listener from the list", () => {
			const callback1 = () => {};
			const callback2 = () => {};
			const callback3 = () => {};

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