export namespace Types {
	export type Handler = <T, B>(value?: T) => void | B | T;
}
