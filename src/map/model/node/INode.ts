import { IMapItem } from "map/model/item/IMapItem";
import { IRouteItem } from "map/model/route/IRouteItem";
import { IListener } from "common/event/IListener";

export interface INode extends IMapItem, IRouteItem, IListener {

}