import React from 'react';
import './Movies.css';


class Movies extends React.Component {
    render() {
        return (
            <>
                <h3>Testing {this.props.movieData}</h3>
            </>
        )
    }
}

export default Movies;
