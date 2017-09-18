import {UPDATE_CITY_TITLE_FOR_SEARCH} from '../actions/index';

export default (state = '', action) => {
    switch (action.type) {
        case UPDATE_CITY_TITLE_FOR_SEARCH:
            return action.payload;
        default:
            return state
    }
};