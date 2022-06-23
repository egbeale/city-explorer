import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './Info.css';

class Info extends React.Component {



    render() {

      return(
        <ListGroup as='list-group'>
          <ListGroup.Item>City: {this.props.cityData.display_name}</ListGroup.Item>
          <ListGroup.Item>Latitude: {this.props.cityData.lat}</ListGroup.Item>
          <ListGroup.Item>Longitude: {this.props.cityData.lon}</ListGroup.Item>
        </ListGroup>      
      );
    }
  
  
  export default Info;
