import React from 'react';
import axios from 'axios';
import './App.css';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Header from './Header.js';
import Weather from './Weather.js';
import CityInfo from './CityInfo.js';
import SearchBar from './SearchBar.js';
import Movies from './Movies.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      lat: '',
      lon: '',
      cityData: {},
      cityMap: '',
      displayCity: false,
      error: false,
      errorMsg: '',
      weatherError: false,
      weatherData: [],
      movieData: [],
      movieError: false,
      displayWeather: false,
      displayMovies: false,
    }
  }

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };


  // ----------- WEATHER HANDLER ------------------
  handleWeather = async (lat, lon) => {
    let weatherUrl = `${process.env.REACT_APP_SERVER}/weather?lat=${lat}&lon=${lon}`
    try {
      let weatherData = await axios.get(weatherUrl);
      console.log(weatherData);
      this.setState({
        displayWeather: true,
        weatherData: weatherData.data,
      });

    } catch (error) {
      this.setState({
        weatherError: true,
        errorMsg: `Error: No weather.`,
      })
    }
  }

  // ----------- MOVIE HANDLER --------------------
  handleMovies = async () => {
    let movieUrl = `${process.env.REACT_APP_SERVER}/movies?location=${this.state.city}`
    try {
      let movieData = await axios.get(movieUrl);
      console.log(movieData);
      this.setState({
        movieData: movieData.data,
        displayMovies: true
      })
    } catch (error) {
      this.setState({
        movieError: true,
        errorMsg: `Error: ${error.response.status}. No movies.`
      })
    };
  };

// --------------- CITY & MAP HANDLER ------------
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //  -------------- MAP ------------------
      let locationUrl = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=JSON`;
      let cityData = await axios.get(locationUrl);

      console.log(cityData); // location iq response

      let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=12`;


      this.setState({
        cityData: cityData.data[0],
        cityMap: cityMap,
        displayCity: true,
      });

      this.handleWeather(cityData.data[0].lat, cityData.data[0].lon);
      this.handleMovies();

    } catch (error) {
      this.setState({
        error: true,
        errorMsg: `Error: ${error.response.status}. Try refreshing the page.`
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

        {this.state.error ? <Alert>{this.state.errorMsg}</Alert> : this.state.displayCity ? 
          <>
            <Image src={this.state.cityMap}/>
            <CityInfo cityData={this.state.cityData}/>
          </> : ''}

        {this.state.weatherError ? <Alert>{this.state.errorMsg}</Alert> :
            <Weather weatherData={this.state.weatherData}/>}

        {this.state.movieError ? <Alert>{this.state.errorMsg}</Alert> :
            <Movies movieData={this.state.movieData}/>}

        <footer>© Elizabeth Beale</footer>

      </>
    )
  };
}

export default App;