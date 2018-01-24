import {RECEIVE_WEATHER_INFO} from "../actions/index";

export default (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_WEATHER_INFO:
            return action.payload;
        default:
            return state;
    }
};