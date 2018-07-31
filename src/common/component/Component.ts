import { TagName } from "common/dom/TagName";

type IComponentConfig = {
    className?: string;
    tagName?: string;
};

class Component {
    private _displayObject: HTMLElement|HTMLInputElement; // TODO: correct typing TS-11
    private _x: number;
    private _y: number;

    constructor(config?: IComponentConfig) {
        const {className, tagName} = config;

        this._displayObject = this._createElement((tagName || TagName.DIV), className);
    }

    addChild(child: HTMLElement|Component|Node) {
        const node = (child instanceof Component) ? child.displayObject() : child;
        this._displayObject.appendChild(node);
    }

    removeChild(child: HTMLElement|Component|Node) {
        const node = (child instanceof Component) ? child.displayObject() : child;
        if (this._displayObject.contains(node))
        {
            this._displayObject.removeChild(node);
        }
    }

    removeChildren() {
        while (this._displayObject.firstChild)
        {
            this.removeChild(this._displayObject.firstChild);
        }
    }

    displayObject(): HTMLElement|HTMLInputElement {
        return this._displayObject;
    }

    addClassNames(classNames: any) {
        const classNameValues = (classNames instanceof Array && classNames.length) ? classNames : [classNames];
        for (const className of classNameValues)
        {
            this._displayObject.classList.add(className);
        }
    }

    hasClassName(className: string): boolean {
        return this._displayObject.classList.contains(className);
    }

    removeClassNames(classNames: string[]|string) {
        if (classNames instanceof Array)
        {
            for (const name of classNames)
            {
                if (this.hasClassName(name))
                {
                    this._displayObject.classList.remove(name);
                }
            }
            return;
        }
        if (this.hasClassName(classNames))
        {
            this._displayObject.classList.remove(classNames);
        }
    }

    setVisible(value: boolean) {
        this._displayObject.style.display = (value) ? '' : 'none';
    }

    setPosition(x: number, y: number) {
        this._displayObject.style.left = x + 'px';
        this._displayObject.style.top = y + 'px';
    }

    x(): number {
        return this._x;
    }

    y(): number {
        return this._y;
    }

    setTextContent(text: string) {
        this._displayObject.textContent = text;
    }

    setAttribute(attr: {name: string, value: string}) {
        this._displayObject.setAttribute(attr.name, attr.value);
    }

    listen(eventType: string, handler: EventListenerOrEventListenerObject) {
        this._displayObject.addEventListener(eventType, handler);
    }

    unlisten(eventType: string, handler: EventListenerOrEventListenerObject) {
        this._displayObject.removeEventListener(eventType, handler);
    }

    private _createElement(elementTag: string, className: string|undefined) {
        const element = document.createElement(elementTag);
        if (className)
        {
            element.setAttribute('class', className);
        }
        return element;
    }
}

export default Component;