import { IMapItem } from "map/item/IMapItem";
import { AbstractNode } from "./AbstractNode";

export class NodeGroup extends AbstractNode {
	private readonly _children: IMapItem[] = [];

	addChild(child: IMapItem) {}

	removeChild(child: IMapItem) {}
}