import React from 'react';
import {Route, HashRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'

import reducer from '../reducer/index';

import Dashboard from "../views/Dashboard";
import Settings from "../views/Settings";
import Header from "../views/Header";

const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware,
        createLogger()
    )
);

export default () => (
    <Provider store={store}>
        <HashRouter>
            <div className="container-fluid">
                <Header/>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/settings" component={Settings}/>
            </div>
        </HashRouter>
    </Provider>);

