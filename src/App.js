import React from 'react';
import axios from 'axios';
import './App.css';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Header from './Header.js';
import Weather from './Weather.js';
import CityInfo from './CityInfo.js';
import SearchBar from './SearchBar.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      cityMap: '',
      error: false,
      errorMsg: '',
      weatherData: [],
      displayWeather: false
    }
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  getWeather = async (lat, lon) => {
    let url = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
    try {
      let weatherData = await axios.get(url);
      console.log(weatherData);
      this.setState({
        weatherData: weatherData.data,
        displayWeather: true
      });

    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `Error: No weather.`,
      })
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {

      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=JSON`;

      let cityData = await axios.get(url);

      let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=11`;

      this.setState({
        cityData: cityData.data[0],
        cityMap: cityMap
      });
      this.getWeather(cityData.data[0].lat, cityData.data[0].lon);
    }

    catch (error) {
      this.setState({
        error: true,
        errorMsg: `Oops, an error occurred: ${error.response.status}. Refresh the page and try again.`
      })
    };
  };

  render() {
    return (
      <>
        <Header />
        <SearchBar
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />

        {this.state.error ? <Alert>{this.state.errorMsg}</Alert> :
          <>
            <Image src={this.state.cityMap} />
            <CityInfo cityData={this.state.cityData} />

          </>}

        <Weather weatherData={this.state.weatherData} city={this.state.city} />
        <footer>© Elizabeth Beale</footer>
      </>
    )
  };
}

export default App;