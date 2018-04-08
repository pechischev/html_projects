import AppView from './view/AppView';
import AuthView from './view/AuthView';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Storage from './storage/Storage';
import { default as Reducer } from './reducer/Reducer';
import Serializer from './controller/Serializer';

class Application {
    private _storage: Storage;
    private _serializer: Serializer;
    private _container: HTMLElement;

    constructor(container: HTMLElement) {

        this._container = container;
        this._serializer = new Serializer();

        this._storage = new Storage(Reducer);
        this._storage.subscribe(this._invalidate.bind(this));
        this._storage.subscribe(this._save.bind(this));
        this._invalidate();

        this._serializer.init();
    }

    private _invalidate() {
        const state = this._storage.getState();
        if (state.user)
        {
            ReactDOM.render(<AppView storage={this._storage}/>, this._container);
        }
        else
        {
            ReactDOM.render(<AuthView storage={this._storage}/>, this._container);
        }
    }

    private _save() {
        const state = this._storage.getState();
        this._serializer.save(state);
    }
}

export default Application;