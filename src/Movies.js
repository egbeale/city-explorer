import React from 'react';
import './Movies.css';


class Movies extends React.Component {
    render() {
        return (
            <>
                <h3>I'm here {this.props.movieData}</h3>
            </>
        )
    }
}

export default Movies;
