import React from 'react';

import SearchForm from "./search-form.component";
import GoogleMap from './google-map.component';
import WeatherInfoTable from "./weather-info-table.component";
import Clock from './clock.component';
import NoteList from "./note-list.component";
import HttpService from "../http/http.service";
import moment from 'moment';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            info: {}
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleSaveNote = this.handleSaveNote.bind(this);
    }

    handleSearchInputChange(searchText) {
        clearTimeout(this.timerId);
        this.timerId = setTimeout(() => {
            HttpService.get('/api/weather', {city: searchText}).then(response => {
                let info = {};
                if (response.cod === 200) {
                    info = response;
                }
                this.setState(() => ({
                    searchText: searchText,
                    info: info
                }));
            });
        }, 500);
    }

    handleSaveNote(noteText) {
        const note = {
            city: this.state.info.name,
            text: noteText,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
        };
        HttpService.post('/api/notes', note).then((id) => {
            console.log(id);
        });
    }

    render() {
        const info = this.state.info;
        return (
            <div className="row">
                <div className="col-md-5">
                    <div className="panel">
                        <div className="panel-heading">
                            <SearchForm onSearchInputChange={this.handleSearchInputChange}
                                        onSaveNote={this.handleSaveNote}/>
                        </div>
                        <div className="panel-body">
                            <WeatherInfoTable info={info}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <NoteList city={info.name}/>
                </div>
                <div className="col-md-3">
                    <GoogleMap coord={info.coord}/>
                </div>
                <div className="col-md-1">
                    <Clock/>
                </div>
            </div>
        );
    }

}

