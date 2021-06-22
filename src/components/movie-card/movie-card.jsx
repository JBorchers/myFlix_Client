import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss'

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    // 'movie' is the name of the prop used in <MovieCard … />
    const { movie } = this.props;

    return (
      <Card class="shadow p-3 mb-5 bg-white rounded">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>{movie.ReleaseDate}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  // must contain a movie object
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseDate: PropTypes.string.isRequired,
    // Director: PropTypes.string.isRequired
  }).isRequired
};