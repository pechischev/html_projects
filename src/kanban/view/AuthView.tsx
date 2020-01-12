import * as React from "react";
import { MemoryStorage } from "kanban/view/memoryStorage/MemoryStorage";
import { IMemoryStorage } from "kanban/view/memoryStorage/IMemoryStorage";
import { ActionCreator } from "kanban/action/ActionCreator";
import { Message } from "kanban/config/Message";
import { Sha1Crypt } from "kanban/crypt/Sha1Crypt";

export class AuthView extends MemoryStorage {
    private _refEmail: HTMLInputElement;
    private _refPassword: HTMLInputElement;
    private _error: Error;

    constructor(props: IMemoryStorage) {
        super(props);

        this._refEmail = null;
        this._refPassword = null;
        this._error = null;
    }

    render() {
        const error = this._storage.getState().error || this._error;
        this._error = null;
        return (
            <div className="auth-form centered">
                <div className="centered">
                    {error ? (<div className="alert alert-danger" role="alert">{error.message}</div>) : null}
                    <span className="help-block">{Message.AUTH_TEXT}</span>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            required={true}
                            ref={(input: HTMLInputElement) => this._refEmail = input}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            required={true}
                            ref={(input: HTMLInputElement) => this._refPassword = input}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            className="btn btn-primary centered"
                            onClick={this._authorization.bind(this)}
                        >
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private _authorization() {
        const email = this._refEmail.value;
        const password = this._refPassword.value;

        if (email && password) {
            this._storage.dispatch(ActionCreator.authAction(email, Sha1Crypt.encode(password)));
        }
        else {
            this._error = new Error(Message.EMPTY_FIELD);
            this.forceUpdate();
        }
    }
}