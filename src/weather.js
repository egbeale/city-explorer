import React from 'react';
import './Weather.css'

class Weather extends React.Component {
    render() {
        return (
            <>
                <h2>Forecast for {this.props.city}</h2>
                {this.props.weatherData.map((day, idx) => (
                    <div>
                        <p>{day.datetime}</p>
                        <p>{day.description}</p>
                    </div>
                ))}
            </>
        );

    }

}

export default Weather;