import React from 'react';

export default class Clock extends React.Component {

    static getFormattedDate() {
        return new Date().toLocaleTimeString();
    }

    tick() {
        this.setState({
            date: Clock.getFormattedDate()
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            date: Clock.getFormattedDate()
        };
    }

    componentDidMount() {
        this.timerId = setInterval(() => this.tick(), 1);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render() {
        return (
            <div className="alert-info">
                <h4>{this.state.date}</h4>
            </div>
        );
    }
}

