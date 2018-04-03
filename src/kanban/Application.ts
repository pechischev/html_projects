import ApplicationView from './view/ApplicationView';
import CardListPresenter from './controller/CardListPresenter';

class Application {
    private _appView: ApplicationView;

    constructor(container: HTMLElement) {

        this._appView = new ApplicationView();
        container.appendChild(this._appView.displayObject());

        const presenter = new CardListPresenter(this._appView);
    }

    start() {

    }
}

export default Application;