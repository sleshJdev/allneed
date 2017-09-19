import {connect} from "react-redux";

import WeatherInfoTable from '../component/dashboard/WeatherInfoTable'

export default connect(state => {
    return {
        info: state.weatherInfo
    };
})
(WeatherInfoTable);