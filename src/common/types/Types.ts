export namespace Types {
	export type Handler = <T, B>(...args: T[]) => void | B | T;
}
