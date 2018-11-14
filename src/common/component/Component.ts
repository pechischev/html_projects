import { TagName } from "common/dom/TagName";

interface IComponentConfig {
	className?: string;
	tagName?: string;
}

export class Component<T extends HTMLElement = HTMLElement> {
	private _element: T;
	private _x: number;
	private _y: number;

	constructor(config?: IComponentConfig) {
		const {className, tagName} = config;

		this._element = this._createElement((tagName || TagName.DIV), className);
	}

	addChild(child: T | Component | Node) {
		const node = (child instanceof Component) ? child.element() : child;
		this._element.appendChild(node);
	}

	removeChild(child: T | Component | Node) {
		const node = (child instanceof Component) ? child.element() : child;
		if (this._element.contains(node)) {
			this._element.removeChild(node);
		}
	}

	removeChildren() {
		while (this._element.firstChild) {
			this.removeChild(this._element.firstChild);
		}
	}

	element(): T {
		return this._element;
	}

	addClassNames(classNames: any) {
		const classNameValues = (classNames instanceof Array && classNames.length) ? classNames : [classNames];
		for (const className of classNameValues) {
			this._element.classList.add(className);
		}
	}

	hasClassName(className: string): boolean {
		return this._element.classList.contains(className);
	}

	removeClassNames(classNames: string[] | string) {
		if (classNames instanceof Array) {
			for (const name of classNames) {
				if (this.hasClassName(name)) {
					this._element.classList.remove(name);
				}
			}
			return;
		}
		if (this.hasClassName(classNames)) {
			this._element.classList.remove(classNames);
		}
	}

	setVisible(value: boolean) {
		this._element.style.display = (value) ? "" : "none";
	}

	setPosition(x: number, y: number) {
		this._element.style.left = `${x}px`;
		this._element.style.top = `${y}px`;
	}

	x(): number {
		return this._x;
	}

	y(): number {
		return this._y;
	}

	setTextContent(text: string) {
		this._element.textContent = text;
	}

	setAttribute(attr: { name: string, value: string }) {
		this._element.setAttribute(attr.name, attr.value);
	}

	listen(eventType: string, handler: EventListenerOrEventListenerObject) {
		this._element.addEventListener(eventType, handler);
	}

	unlisten(eventType: string, handler: EventListenerOrEventListenerObject) {
		this._element.removeEventListener(eventType, handler);
	}

	private _createElement(elementTag: string, className?: string): T {
		const element = document.createElement(elementTag) as T;
		if (className) {
			element.setAttribute("class", className);
		}
		return element;
	}
}
