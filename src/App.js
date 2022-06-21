import logo from './logo.svg';
import './App.css';
import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";


class App extends React.Component {
  construtor(props) {
    super(props);
    this.state = {
      city: '',
      long: '',
      lat: ''
    }
  }

//Input handler. Gives us the data from the input.
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let cityData = await axios.get('https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json');
      
    }
  }

  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label></Form.Label>
          <Form.Control
            type='text'
            id='cityName'
            onChange={this.props.handleChange}
          />
          <button type='submit' onClick={this.props.handleSubmit}>Explore!</button>

        </Form.Group>
      </Form>
    )
  }


export default App;
