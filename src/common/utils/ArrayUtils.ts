export namespace ArrayUtils {
	export const replacePositionTo = <T>(arr: T[], oldIndex: number, newIndex: number): T[] => {
		if (newIndex >= arr.length) {
			let k = newIndex - arr.length + 1;
			while (k--) {
				arr.push(undefined);
			}
		}
		arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
		return arr;
	};

	export const findIndex = <T>(arr: T[], handler: (value: T, index: number) => void): number => {
		for (let i = 0; i < arr.length; ++i) {
			const item = arr[i];
			if (handler(item, i)) {
				return i;
			}
		}
		return -1;
	};

	export const find = <T>(arr: T[], handler: (value: T, index: number) => void): T | undefined => {
		const index = findIndex(arr, handler);
		if (index === -1) {
			return null;
		}
		return arr[index];
	};

	export const uniq = <T>(arr: T[]): T[] => {
		return Array.from(new Set(arr));
	};
}
