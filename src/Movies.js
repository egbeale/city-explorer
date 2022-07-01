import React from 'react';
import './Movies.css';


class Movies extends React.Component {
    render() {
        return (
            <>
                {this.props.movieData.map((movie, idx) => (
                    <ul key={idx}>
                        <li>{movie.title}:</li>
                        <li>{movie.image}</li>
                        {/* template literal image tag with url , movie.img */}
                    </ul>
                ))}
            </>
        );

    }

}

// https://image.tmdb.org/t/p/w300

export default Movies;
