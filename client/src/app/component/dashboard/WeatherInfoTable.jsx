import React from 'react';

export default ({info}) => {
    if (Object.keys(info).length === 0) {
        return (
            <span className="alert-info">There is nothing to display</span>
        );
    } else {
        return (
            <table className="table">
                <caption>{info.name}({info.sys.country})</caption>
                <thead>
                <tr>
                    <td>Feature</td>
                    <td>Value</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Temperature</td>
                    <td>{info.main.temp} &deg;C</td>
                </tr>
                <tr>
                    <td>Weather</td>
                    <td>
                        {info.weather.map((weather, index) => (
                            <span key={index}>
                                    {weather.main}({weather.description})
                                {index < weather.length - 1 ? ', ' : ''}
                                </span>
                        ))}
                    </td>
                </tr>
                <tr>
                    <td>Wind</td>
                    <td>Speed: {info.wind.speed}, Deg.: {info.wind.deg}</td>
                </tr>
                </tbody>
            </table>
        );
    }
};