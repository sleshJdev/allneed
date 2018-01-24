import {combineReducers} from 'redux'
import cityTitle from "./cityTitle"
import weatherInfo from "./weatherInfo"
import notes from "./notes";

export default combineReducers({
    cityTitle: cityTitle,
    weatherInfo: weatherInfo,
    notes: notes
});