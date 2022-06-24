import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import './CityInfo.css';


class CityInfo extends React.Component {
  render() {
    return(
      <ListGroup>
        <ListGroup.Item className="city">{this.props.cityData.display_name}</ListGroup.Item>
        <ListGroup.Item>Latitude: {this.props.cityData.lat}°</ListGroup.Item>
        <ListGroup.Item>Longitude: {this.props.cityData.lon}°</ListGroup.Item>
      </ListGroup>
    );
    }
  }

export default CityInfo;

      // <>
      //   <h3>{this.props.cityData.display_name}</h3>
      //   <ul>
      //     <li>{this.props.cityData.lat}°</li>
      //     <li>{this.props.cityData.lon}°</li>
      //   </ul>
      // </>
