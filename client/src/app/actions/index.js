import fetch from 'isomorphic-fetch';

export const UPDATE_CITY_TITLE_FOR_SEARCH = 'UPDATE_CITY_TITLE_FOR_SEARCH';
export const updateCityTitleForSearch = (cityTitle) => ({
    type: UPDATE_CITY_TITLE_FOR_SEARCH,
    payload: cityTitle
});

export const RECEIVE_WEATHER_INFO = 'RECEIVE_WEATHER_INFO';
export const receiveWeatherInfo = info => ({
    type: RECEIVE_WEATHER_INFO,
    payload: info
});

export const RECEIVE_NOTES = 'RECEIVE_NOTES';
export const receiveNotes = notes => ({
    type: RECEIVE_NOTES,
    payload: notes
});

export const ADD_NOTE = 'ADD_NOTE';
export const addNote = note => ({
    type: ADD_NOTE,
    payload: note
});

export const REMOVE_NOTE = 'REMOVE_NOTE';
export const removeNote = noteId => ({
    type: REMOVE_NOTE,
    payload: noteId
});

export const fetchWeatherInfo = (cityTitle) => {
    return dispatch => {
        return fetch(`/api/weather?city=${cityTitle}`).then(
            response => response.json(),
            error => console.error(`An error occurred. `, error)
        ).then(weatherInfo => {
            if (weatherInfo.cod === 200) {
                dispatch(receiveWeatherInfo(weatherInfo));
            } else {
                dispatch(receiveWeatherInfo({}));
                throw new Error(`City ${cityTitle} not found`);
            }
        });
    };
};

export const fetchNotes = (city) => {
    return dispatch => {
        return fetch(`/api/notes?city=${city}`)
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error))
            .then(notes => dispatch(receiveNotes(notes)));
    };
};

export const saveNote = (note) => {
    return dispatch => {
        return fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        }).then(
            response => response.json(),
            error => console.error(`An error occurred.`, error)
        ).then(id => dispatch(addNote({id: id, ...note})));
    };
};

export const deleteNote = (noteId) => {
    return dispatch => {
        return fetch(`/api/notes?id=${noteId}`, {method: 'DELETE'}).then(
            () => dispatch(removeNote(noteId)),
            error => console.error(`An error occurred.`, error));
    };
};