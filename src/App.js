import React from 'react';
import axios from 'axios';
import './App.css';
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert'
import Header from './Header.js';
import Weather from './Weather.js';

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

    getWeather = async (lat, lon) => {
      let url = `${process.env.REACT_APP_SERVER}weather?lat=${lat}&lon=${lon}`
      try {
        let weatherData = await axios.get(url);
        this.setState({
          weatherData: weatherData.data,
          displayWeather: true
        });

      } catch (error) {
        this.setState({
          error: true,
          errorMsg: `Error: No weather.`
        })
      }
    }


  };

  render() {
    return (
      <>
        <Header />
        <Form>
          <Form.Group>
            <Form.Label>City Search:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Type your city'
              onInput={this.handleInput}>
            </Form.Control>
            <button type='submit' onClick={this.handleSubmit}>EXPLORE</button>
          </Form.Group>
        </Form>
        {this.state.error ? <Alert>{this.state.errorMsg}</Alert> :
          <>
            <ListGroup>
              <ListGroup.Item>City: {this.state.cityData.display_name}</ListGroup.Item>
              <ListGroup.Item>Latitude: {this.state.cityData.lat}</ListGroup.Item>
              <ListGroup.Item>Longitude: {this.state.cityData.lon}</ListGroup.Item>
            </ListGroup>
            <Image src={this.state.cityMap}></Image>
          </>}
          <Weather weatherData={this.state.weatherData}></Weather>
        <footer>© Elizabeth Beale</footer>
      </>
    )
  };
}

export default App;