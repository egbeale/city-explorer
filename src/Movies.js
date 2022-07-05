import React from 'react';
import Card from 'react-bootstrap/Card';
import './Movies.css';


class Movies extends React.Component {
    render() {
        return (
            <>
                <h2>Movies</h2>
                {this.props.movieData.map((movie, idx) => (
                    <Card key={idx}>
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            {/* <Card.Img>
                                src={movie.image}
                                alt={movie.title}
                            </Card.Img> */}
                            <Card.Text>{movie.overview}</Card.Text>
                        </Card.Body>
                        {/* template literal image tag with url , movie.img */}
                    </Card>
                ))}
            </>
        );
    }

}
// https://image.tmdb.org/t/p/w300


export default Movies;
