export function verify<T>(value: T | null): T {
	if (value) {
		return value;
	}
	throw new Error("Unexpected null");
}

export function notImplement() {
	throw new Error("Call without implement");
}
