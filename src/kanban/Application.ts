import ApplicationView from './view/ApplicationView';

class Application {
    private _appView: ApplicationView;

    constructor(container: HTMLElement) {

        this._appView = new ApplicationView();
        container.appendChild(this._appView.displayObject());
    }

    start() {

    }
}

export default Application;