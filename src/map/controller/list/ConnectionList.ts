import { Disposable } from "common/component/Disposable";

export class ConnectionList extends Disposable {
	readonly connectEvent = this.createDispatcher();
	readonly disconnectEvent = this.createDispatcher();

	private _connections = new Map<string, string[]>();

	connect(source: string, target: string) {
		if (this.isConnected(source, target)) {
			return;
		}
		this.appendConnection(source, target);
		if (source != target) {
			this.appendConnection(target, source);
		}
		this.connectEvent.dispatch(source, target);
	}

	disconnect(source: string, target: string) {
		if (!this.isConnected(source, target)) {
			return;
		}
		this.removeConnection(source, target);
		if (source != target) {
			this.removeConnection(target, source);
		}
		this.disconnectEvent.dispatch(source, target);
	}

	isConnected(item: string, otherItem: string): boolean {
		return this.getConnections(item).indexOf(otherItem) > -1;
	}

	getConnections(item: string): string[] {
		return (this._connections.get(item) || []).slice();
	}

	private appendConnection(item1: string, item2: string) {
		this._connections.set(item1, [...(this._connections.get(item1) || []), item2]);
	}

	private removeConnection(item1: string, item2: string) {
		const connections = this._connections.get(item1);
		const index = connections.indexOf(item2);
		if (index < 0) {
			return;
		}
		connections.splice(index, 1);
		this._connections.set(item1, [...connections]);
	}
}