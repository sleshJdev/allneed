import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoogleMapService from './google-map.service';
import config from '../../conf/app.config.json';

class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this.googleContainerId = `google-container-id-${Date.now()}`;

        const src = `https://maps.googleapis.com/maps/api/js?key=${config.google.apiKey}&callback=CALLBACK_NAME`;
        const script = GoogleMapService.loadScript('google', src);

        script.promise.then(() => {
            const container = document.getElementById(this.googleContainerId);
            this.map = new google.maps.Map(container, {
                zoom: 6
            });
        });
    }

    setCenter(center) {
        if (this.marker) {
            this.marker.setMap(null);
        }
        this.map.setCenter(center);
        this.marker = new google.maps.Marker({
            position: center,
            map: this.map
        });
    }

    componentDidUpdate() {
        if (!this.props.coord) {
            this.setCenter(null);
            return;
        }
        this.setCenter(
            new google.maps.LatLng(
                this.props.coord.lat,
                this.props.coord.lon
            )
        );
    }

    render() {
        return (
            <div id={this.googleContainerId}
                 style={{
                     width: this.props.width,
                     height: this.props.height
                 }}/>
        );
    }

}

GoogleMap.defaultProps = {
    width: 400,
    height: 300
};

GoogleMap.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number
};

export default GoogleMap;