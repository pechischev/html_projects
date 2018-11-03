import { Listener } from "common/event/Listener";

export interface IMapItem extends Listener {
	id(): string;

	title(): string;
}
