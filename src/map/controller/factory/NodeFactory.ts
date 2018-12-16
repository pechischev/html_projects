import { Content } from "map/model/content/Content";
import { NodeItem } from "map/model/node/NodeItem";
import { NodeGroup } from "map/model/node/NodeGroup";
import { Config } from "map/config/Config";

let count = 1;

export class NodeFactory {
	static createItem(title?: string, type?: string): NodeItem {
		const node = new NodeItem();
		node.setContent(NodeFactory.createContent(title || `${Config.NODE_NAME} ${count}`));
		if (type) {
			node.setType(type);
		}
		++count;
		return node;
	}

	static createGroup(title?: string): NodeGroup {
		const group = new NodeGroup();
		group.setContent(NodeFactory.createContent(title || Config.GROUP_NAME));
		return group;
	}

	private static createContent(title: string): Content {
		const content = new Content();
		content.setTitle(title);
		return content;
	}
}