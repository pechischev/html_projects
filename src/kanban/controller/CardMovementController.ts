import CardView from '../view/CardView';
import Coordinate from '../../common/math/Coordinate';

class CardMovementController {
    private _selectedItemView: CardView;
    private _startPosition: Coordinate|null;

    constructor() {

    }

    move(itemView: CardView, event: MouseEvent) {
        this._startPosition = new Coordinate(event.pageX, event.pageY - itemView.displayObject().offsetTop);

        this._selectedItemView = itemView;
        this._selectedItemView.addClassNames('moving');

        document.onmousemove = this._onMouseMove.bind(this);
        document.onmouseup = this._onMouseUp.bind(this);
    }

    private _onMouseMove(event: MouseEvent) {
        this._selectedItemView.setPosition(event.pageX - this._startPosition.x, event.pageY - this._startPosition.y);

        event.preventDefault();
    }

    private _onMouseUp(event: MouseEvent) {
        this._selectedItemView.removeClassNames('moving');
        this._selectedItemView.setPosition(0, 0);

        event.preventDefault();

        this._selectedItemView = null;
        this._startPosition = null;

        document.onmousemove = null;
        document.onmouseup = null;
    }
}

export default CardMovementController;