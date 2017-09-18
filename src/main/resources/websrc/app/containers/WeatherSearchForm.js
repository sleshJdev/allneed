import {connect} from "react-redux";
import moment from 'moment';

import WeatherSearchForm from '../components/WeatherSearchForm';
import {fetchNotes, fetchWeatherInfo, saveNote, updateCityTitleForSearch} from "../actions/index";

export default connect(state => ({
    cityTitle: state.cityTitle
}), dispatch => ({
    updateCityTitleForSearch: (function () {
        let timerId;
        return (cityTitle) => {
            dispatch(updateCityTitleForSearch(cityTitle));
            clearTimeout(timerId);
            timerId = setTimeout(() => {
                dispatch(fetchWeatherInfo(cityTitle))
                    .then(dispatch(fetchNotes(cityTitle)));
            }, 500);
        };
    })(),
    saveNote: (cityTitle, noteText) => {
        dispatch(saveNote({
            city: cityTitle,
            text: noteText,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss.SSSSSS')
        })).then((id) => {
            console.log(`Note[id=${id}] was created`);
        });
    }
}))
(WeatherSearchForm);
