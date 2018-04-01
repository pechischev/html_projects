import TagName from '../dom/TagName';

type IComponentConfig = {
    className: string | undefined;
    tagName: string | undefined;
};

class Component {
    private _displayObject: HTMLElement;
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

    displayObject(): HTMLElement {
        return this._displayObject;
    }

    addClassNames(classNames: string[]|string) {
        const classNameValues = (classNames instanceof Array && classNames.length) ? classNames : [classNames];
        for (const className of classNameValues)
        {
            this._displayObject.classList.add(...className); // TODO: fix compiler error TS2345
        }

    }

    hasClassName(className: string): boolean {
        return this._displayObject.classList.contains(className);
    }

    removeClassNames(classNames: Array<string>|string) {
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

    private _createElement(elementTag: string, className: string|undefined) {
        const element = document.createElement(elementTag);
        if (className)
        {
            element.setAttribute('class', className);
        }
        return element;
    }
}

export = Component;