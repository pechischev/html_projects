import * as React from 'react';
import MemoryStorage from './memoryStorage/MemoryStorage';
import IMemoryStorageProps from './memoryStorage/IMemoryStorageProps';
import ActionCreator from '../action/ActionCreator';

class AuthView extends MemoryStorage {
    private _refEmail: HTMLInputElement;
    private _refPassword: HTMLInputElement;

    constructor(props: IMemoryStorageProps) {
        super(props);

        this._refEmail = null;
        this._refPassword = null;
    }

    render() {
        const error = this._storage.getState().error;
        return (
            <div className="auth-form row ">
                <form className="centered">
                    {error ? (<div className="alert alert-danger" role="alert">{error.message}</div>) : null}
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="email" className="form-control" placeholder="Email" required ref={(input: HTMLInputElement) => this._refEmail = input} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" placeholder="Password" required ref={(input: HTMLInputElement) => this._refPassword = input} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-primary centered" onClick={this._authorization.bind(this)}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    private _authorization() {
        // TODO: retrieve after realization
        const email = "temp1@gmail.com"; //this._refEmail.value;
        const password = "1"; //this._refPassword.value;

        if (email && password)
        {
            this._storage.dispatch(ActionCreator.authAction(email, password));
        }
    }
}

export default AuthView;