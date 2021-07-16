import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './genre-view.scss';
import { MovieCard } from "../movie-card/movie-card";

import { connect } from 'react-redux';


export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies, genresMovies } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <h1><span className="text-white">{genre.Name} Films </span></h1>
        </div>
        <h4 className="genre-description text-white">
          <span className="value">{genre.Description}</span>
        </h4>
        <p> </p>
        <h4 className="text-white">Featured movies in this Genre:</h4>
        <Col md={6}>
          <div id="genresMovies">

            {genresMovies.map(m => {
              return (
                <Col md={12} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              )
            })}
          </div>
        </Col>
        <Button variant="info" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps)(GenreView)