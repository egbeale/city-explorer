import React from 'react';
import Form from 'react-bootstrap/Form';
import './Search.css';

class Search extends React.Component {



  render() {
    return (
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
    );
  }
}

export default Search;
