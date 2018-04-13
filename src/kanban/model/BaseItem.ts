import Utils from 'common/utils/Utils';
import Dispatcher from 'common/event/Dispatcher';

class BaseItem {
    private _title: string;
    private _id: string;
    private _titleChangedEvent: Dispatcher;

    constructor(title: string, id?: string) {
        this._id = (id) ? id : Utils.getUid();

        this._title = title;

        this._titleChangedEvent = new Dispatcher();
    }

    titleChangedEvent(): Dispatcher {
        return this._titleChangedEvent;
    }

    id(): string {
        return this._id;
    }

    setTitle(title: string) {
        if ( this._title != title)
        {
            this._title = title;
            this._titleChangedEvent.dispatch();
        }
    }

    title(): string {
        return this._title;
    }
}

export default BaseItem;