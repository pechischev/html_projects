import AppView from './view/AppView';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Storage from './storage/Storage';
import { default as ListReducer } from './reducer/ListReducer';

class Application {
    constructor(container: HTMLElement) {

        const storage = new Storage(ListReducer);
        ReactDOM.render(<AppView storage={storage}/>, container);
    }

    start() {

    }
}

export default Application;