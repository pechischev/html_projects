import Utils from "common/utils/Utils";

export class Item {
    private _id = Utils.getUid();
    private _name = "";

    get id(): string {
        return this._id;
    }

    set name(value: string) {
        this._name = value;
    }

    get name(): string {
        return this._name;
    }
}
