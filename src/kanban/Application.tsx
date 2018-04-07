import AppView from './view/AppView';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Store from './store/Store';
import { default as listReducer } from './reducer/ListReducer';

class Application {
    constructor(container: HTMLElement) {

        const store = new Store(listReducer);
        ReactDOM.render(<AppView store={store}/>, container);
    }

    start() {

    }
}

export default Application;