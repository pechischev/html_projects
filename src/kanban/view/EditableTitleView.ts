import Component from '../../common/component/Component';
import TextInput from '../../common/component/TextInput';
import BaseItem from '../model/BaseItem';

class EditableTitleView extends Component {
    private _textInput: TextInput;
    private _title: Component;

    constructor(item: BaseItem) {
        super({className: 'title-container'});

        this._title = new Component({ className: 'title'});
        this._title.setTextContent(item.title());
        this.addChild(this._title);

        this._textInput = new TextInput();
        this._textInput.addClassNames('title');
        this._textInput.setVisible(false);
        this.addChild(this._textInput);

        item.titleChangedEvent().addListener(() => {
            this._title.setTextContent(item.title());
        });

        this._title.listen('dblclick', (event: Event) => {
            this._textInput.setValue(item.title());
            this._setEditableState(true);

            event.preventDefault(); // TODO: set pointer to input field
        });

        this._textInput.changedEvent().addListener(() => {
            this._setEditableState(false);
            item.setTitle(this._textInput.value());
        });

        document.addEventListener('click', (event: Event) => {
            if (event.target != this._textInput.displayObject())
            {
                this._setEditableState(false);
            }
        });
    }

    private _setEditableState(isEdit: boolean) {
        this._title.setVisible(!isEdit);
        this._textInput.setVisible(isEdit);
    }
}

export default EditableTitleView;