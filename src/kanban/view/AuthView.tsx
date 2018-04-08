import * as React from 'react';
import MemoryStorage from './memoryStorage/MemoryStorage';
import IMemoryStorageProps from './memoryStorage/IMemoryStorageProps';
import ActionCreator from '../action/ActionCreator';
import Message from '../message/Message';

class AuthView extends MemoryStorage {
    private _refEmail: HTMLInputElement;
    private _refPassword: HTMLInputElement;
    private _error: Error;

    constructor(props: IMemoryStorageProps) {
        super(props);

        this._refEmail = null;
        this._refPassword = null;
        this._error = null;
    }

    render() {
        const error = this._storage.getState().error || this._error;
        this._error = null;
        return (
            <div className="auth-form">
                <div className="centered">
                    {error ? (<div className="alert alert-danger" role="alert">{error.message}</div>) : null}
                    <span className="help-block">{Message.AUTH_TEXT}</span>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email" required ref={(input: HTMLInputElement) => this._refEmail = input} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password" required ref={(input: HTMLInputElement) => this._refPassword = input} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary centered" onClick={this._authorization.bind(this)}>Log in</button>
                    </div>
                </div>
            </div>
        );
    }

    private _authorization() {
        const email = this._refEmail.value;
        const password = this._refPassword.value;

        if (email && password)
        {
            this._storage.dispatch(ActionCreator.authAction(email, password));
        }
        else
        {
            this._error = new Error(Message.EMPTY_FIELD);
            this.forceUpdate();
        }
    }
}

export default AuthView;