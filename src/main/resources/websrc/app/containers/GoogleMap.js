import {connect} from "react-redux";
import GoogleMap from "../components/GoogleMap";

export default connect(state => ({
    coord: state.weatherInfo.coord
}))(GoogleMap);