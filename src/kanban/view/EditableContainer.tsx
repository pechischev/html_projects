import * as React from 'react';
import BaseItem from 'kanban/model/BaseItem';
import MemoryStorage from 'kanban/view/memoryStorage/MemoryStorage';
import IMemoryStorageProps from 'kanban/view/memoryStorage/IMemoryStorageProps';
import ActionCreator from 'kanban/action/ActionCreator';

interface IEditableContainerState {
    editable: boolean;
    title: string;
}

interface IEditableContainerProps extends IMemoryStorageProps {
    item: BaseItem;
}

class EditableContainer extends MemoryStorage<IEditableContainerProps, IEditableContainerState> {
    private _item: BaseItem;

    constructor(props: IEditableContainerProps) {
        super(props);

        this._item = props.item;

        this.state = {
            editable: false,
            title: props.item.title()
        };

        this._item.titleChangedEvent().addListener(this._updateTitle, this);
    }

    render(): any {
        return (
            <div className="title-container">
                {this.state.editable ? this._inputElement() : this._titleElement()}
            </div>
        );
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        this._item.titleChangedEvent().removeListener(this._updateTitle, this);
    }

    private _toggleEditableState() {
        this.setState({
            editable: !this.state.editable,
        });
    }

    private _updateTitle() {
        this.setState({
            title: this._item.title()
        });
        this._storage.dispatch(ActionCreator.updateItemAction());
    }

    private _onInput(event: Event) {
        if (event.target instanceof HTMLInputElement)
        {
            this._item.setTitle(event.target.value);
        }
    }

    private _onFocus(event: Event) {
        const element = event.target;
        if (element instanceof HTMLInputElement)
        {
            element.selectionStart = element.value.length;
        }
    }

    private _inputElement(): any {
        return (
            <input type="text"
                   className="title form-control form-control-sm"
                   onChange={this._onInput.bind(this)}
                   onBlur={this._toggleEditableState.bind(this)}
                   value={this.state.title}
                   onFocus={this._onFocus.bind(this)}
                   autoFocus
            />
        );
    }

    private _titleElement(): any {
        return (
            <div className="title form-control-sm" onClick={this._toggleEditableState.bind(this)}>{this.state.title}</div>
        );
    }
}

export default EditableContainer;