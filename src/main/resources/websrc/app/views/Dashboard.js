import React from 'react';
import WeatherSearchForm from "../container/WeatherSearchForm";
import WeatherInfoTable from "../container/WeatherInfoTable";
import NoteList from "../container/NoteList";
import GoogleMap from "../container/GoogleMap";
import Clock from "../component/dashboard/Clock";

export default () => (
    <div className="panel panel-default">
        <div className="panel-body">
            <div className="container-fluid">
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
        </div>
    </div>
);