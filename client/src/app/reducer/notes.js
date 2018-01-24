import {ADD_NOTE, RECEIVE_NOTES, REMOVE_NOTE} from "../actions/index";

export default (state = [], action) => {
    switch (action.type) {
        case RECEIVE_NOTES:
            return action.payload;
        case ADD_NOTE:
            return [...state, action.payload];
        case REMOVE_NOTE:
            const id = action.payload;
            return state.filter(it => it.id !== id);
        default:
            return state;
    }
};