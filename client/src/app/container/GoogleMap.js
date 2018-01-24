import {connect} from "react-redux";
import GoogleMap from "../component/dashboard/GoogleMap";

export default connect(state => ({
    coord: state.weatherInfo.coord
}))(GoogleMap);