import React from 'react';
import './Weather.css'

class Weather extends React.Component {
    render() {
        return (
            <>
                <h2>{this.props.city} 3-day Forecast</h2>

                {this.props.weatherData.map((day, idx) => (
                    <ul key={idx}>
                        <li>{day.datetime}:</li>
                        <li>{day.description}</li>
                    </ul>
                ))}
            </>
        );

    }

}

export default Weather;