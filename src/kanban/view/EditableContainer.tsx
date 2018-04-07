import * as React from 'react';
import BaseItem from '../model/BaseItem';

interface IEditableContainerState {
    editable: boolean;
    title: string;
}

interface IEditableContainerProps {
    item: BaseItem;
}

class EditableContainer extends React.Component<IEditableContainerProps, IEditableContainerState> {
    private _item: BaseItem;

    constructor(props: IEditableContainerProps) {
        super();

        this._item = props.item;

        this.state = {
            editable: false,
            title: props.item.title()
        };

        this._item.titleChangedEvent().addListener(this._updateTitle, this);
    }

    render () {
        return (
            <div className="title-container">
                {this.state.editable ? this._inputElement() : this._titleElement()}
            </div>
        );
    }

    componentWillUnmount() {
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
    }

    private _onInput(event: Event) {
        if (event.target instanceof HTMLInputElement)
        {
            this._item.setTitle(event.target.value);
        }
    }

    private _inputElement() {
        return (
            <input type="text"
                   className="title form-control form-control-sm"
                   onChange={this._onInput.bind(this)}
                   onBlur={this._toggleEditableState.bind(this)}
                   value={this.state.title}
                   autoFocus
            />
        );
    }

    private _titleElement() {
        return (
            <div className="title form-control-sm" onClick={this._toggleEditableState.bind(this)}>{this.state.title}</div>
        );
    }
}

export default EditableContainer;