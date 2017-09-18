import {connect} from "react-redux";

import WeatherInfoTable from '../components/WeatherInfoTable'

export default connect(state => {
    return {
        info: state.weatherInfo
    };
})
(WeatherInfoTable);