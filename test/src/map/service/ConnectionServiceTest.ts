import { expect } from "chai";
import { LinkList } from "map/controller/list/LinkList";
import { ConnectionService } from "map/service/ConnectionService";

// tslint:disable
describe("ConnectionService", () => {
	let list: LinkList;
	let service: ConnectionService;

	function checkConnections(source: string, targets: string[], result) {
		for (const target of targets) {
			expect(service.isConnected(source, target)).to.be.equal(result);
		}
	}

	function expectConnectionCount(item: string, count: number) {
		expect(service.getConnections(item).length).to.be.equal(count);
	}

	beforeEach(() => {
		list = new LinkList();
		service = new ConnectionService(list);
	});

	describe("connect", () => {
		it("should create connection between items", () => {
			service.connect("1", "2");
			checkConnections("1", ["2"], true);
			expectConnectionCount("1", 1);
		});

		it("should create connection on itself items", () => {
			service.connect("1", "1");
			checkConnections("1", ["1"], true);
			expectConnectionCount("1", 1);
		});

		it("should not create identical links between items", () => {
			service.connect("1", "2");
			expectConnectionCount("1", 1);
			service.connect("1", "2");
			expectConnectionCount("1", 1);
		});

		it("should connect several items", () => {
			service.connect("1", "2");
			service.connect("1", "3");
			service.connect("1", "4");
			checkConnections("1", ["2", "3", "4"], true);
			expectConnectionCount("1", 3);
		});

		it("should has connections for target item", () => {
			service.connect("1", "2");
			service.connect("3", "2");
			checkConnections("2", ["1", "3"], true);
			expectConnectionCount("2", 2);
		});
	});

	describe("disconnect", () => {
		it("should disconnect connected items", () => {
			service.connect("1", "2");
			service.disconnect("1", "2");
			expectConnectionCount("1", 0);
			checkConnections("1", ["2"], false);
		});

		it("should remove connection for target when items is disconnect", () => {
			service.connect("1", "2");
			service.connect("2", "3");
			service.disconnect("1", "2");
			expectConnectionCount("2", 1);
			checkConnections("2", ["3"], true);
		});

		it("should remove connection on item itself", () => {
			service.connect("1", "1");
			service.disconnect("1", "1");
			expectConnectionCount("1", 0);
			checkConnections("1", ["1"], false);
		});
	});
});
