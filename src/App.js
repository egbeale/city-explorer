import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
// import Button from 'react-bootstrap/Button';


class App extends React.Component {
  construtor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      cityMap: '',
      error: false,
      errorMessage: ''
    }
  }

//Input handler.

  handleInput = (e) => {
    this.setState({
      city: e.target.value
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let cityData = await axios.get('https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json');
      let cityMap = await `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LocationIQ_API_Token}&center=${cityData.data[0].lat},${cityData.data[0].lon}&zoom=11`;
      this.setState ({
        cityData: cityData.data[0],
        cityMap: cityMap
      });
    }
    catch(error) {
      this.setState ({
        error: true,
        errorMessage: `Oops, an error occurred: ${error.response.status}. Refresh the page and try again.`
      })
    }
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Enter city</Form.Label>
          <Form.Control
            type='text'
            id=''
            onChange={this.handleInput}
          />
          <button type='submit' onClick={this.handleSubmit}>Explore!</button>

        </Form.Group>
      </Form>
    )
  }


export default App;
