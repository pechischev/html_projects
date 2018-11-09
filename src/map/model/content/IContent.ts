import { Listener } from "common/event/Listener";

export interface IContent extends Listener {
	title(): string;

	setTitle(title: string);
}
