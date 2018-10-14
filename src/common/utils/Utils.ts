export namespace Utils {
	let uidCounter = 0;
	// tslint:disable:no-magic-numbers
	const UID_PROPERTY = `utils_uid_${((Math.random() * 1e9) >>> 0)}`;

	export const getUid = (obj: object): string => {
		return obj[UID_PROPERTY] || (obj[UID_PROPERTY] = ++uidCounter);
	};
}
