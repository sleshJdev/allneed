import React from 'react';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer/index';

import Clock from '../components/Clock';
import WeatherSearchForm from "./WeatherSearchForm";
import WeatherInfoTable from "./WeatherInfoTable";
import NoteList from "./NoteList";
import GoogleMapService from '../service/GoogleMapService';

import config from '../conf/app.config.json';
import GoogleMap from "./GoogleMap";

const createGoogleMapObject = () => {
    const googleContainerId = `google-container-id-${Date.now()}`;

    const src = `https://maps.googleapis.com/maps/api/js?key=${config.google.apiKey}&callback=CALLBACK_NAME`;
    const script = GoogleMapService.loadScript('google', src);

    script.promise.then(() => {
        const container = document.getElementById(googleContainerId);
        const map = new google.maps.Map(container, {zoom: 6});
    });
};
// createGoogleMapObject();

const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));

export default () => {
    return (
        <Provider store={store}>
            <div className="row">
                <div className="row">
                    <div className="col-md-5">
                        <div className="panel">
                            <div className="panel-heading">
                                <WeatherSearchForm/>
                            </div>
                            <div className="panel-body">
                                <WeatherInfoTable/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <NoteList/>
                    </div>
                    <div className="col-md-3">
                        <GoogleMap/>
                    </div>
                    <div className="col-md-1">
                        <Clock/>
                    </div>
                </div>
            </div>
        </Provider>);
};

