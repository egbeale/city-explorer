import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Location.css';


class Location extends React.Component {
  render() {
    return(
      <ListGroup>
        <ListGroup.Item>{this.props.cityData.display_name}</ListGroup.Item>
        <ListGroup.Item>Latitude:{this.props.cityData.lat}</ListGroup.Item>
        <ListGroup.Item>Longitude: {this.props.cityData.lon}</ListGroup.Item>
      </ListGroup>
    );
    }
  }

export default Location;

