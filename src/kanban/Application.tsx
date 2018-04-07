import AppView from './view/AppView';
import AuthView from './view/AuthView';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Storage from './storage/Storage';
import { default as Reducer } from './reducer/Reducer';

class Application {
    constructor(container: HTMLElement) {

        const storage = new Storage(Reducer);
        storage.subscribe(() => {
            const state = storage.getState();
            if (state.user)
            {
                ReactDOM.render(<AppView storage={storage}/>, container);
            }
        });
        ReactDOM.render(<AuthView storage={storage}/>, container);
    }
}

export default Application;