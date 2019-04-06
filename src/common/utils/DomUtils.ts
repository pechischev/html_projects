import { RefObject } from "react";

export namespace DomUtils {
	export const isParent = (parent: Element, element?: HTMLElement) => {
		// tslint:disable-next-line:no-parameter-reassignment no-conditional-assignment
		while (element && (element = element.parentElement)) {
			if (element === parent) {
				return true;
			}
		}
		return false;
	};

	export const hasCurrentParent = (parent: RefObject<HTMLElement>, element?: HTMLElement) => {
		if (!parent.current) {
			return false;
		}
		return isParent(parent.current, element);
	};
}
