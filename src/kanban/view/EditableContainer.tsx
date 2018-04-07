import * as React from 'react';

type EditableContainerState = {
    editable: boolean
    title: string
};

class EditableContainer extends React.Component<any, EditableContainerState> {
    constructor(props: any) {
        super();

        this.state = {
            editable: false,
            title: props.text
        };
    }

    render () {
        return (
            <div className="title-container">
                {this.state.editable ? this._inputElement() : this._titleElement()}
            </div>
        );
    }

    private _toggleEditableState() {
        this.setState({
            editable: !this.state.editable,
        });
    }

    private _onInput(event: Event) {
        if (event.target instanceof HTMLInputElement)
        {
            const title = event.target.value;
            this.setState({
                title: title
            });
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