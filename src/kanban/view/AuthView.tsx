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
        const thisPtr = this;
        return (
            <div className="auth-form row ">
                <form>
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-2 control-label" >Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" placeholder="Email" ref={(input: HTMLInputElement) => thisPtr._refEmail = input} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" placeholder="Password" ref={(input: HTMLInputElement) => thisPtr._refPassword = input} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-default clickable" onClick={this._authorization.bind(this)}>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

    private _authorization() {
        const email = this._refEmail.value;
        const password = "123"; //this._refPassword.value;
        // TODO: get list users and check on equals
        this._storage.dispatch(ActionCreator.authAction(email, password));
    }
}

export default AuthView;