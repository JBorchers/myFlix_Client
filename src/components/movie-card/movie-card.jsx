import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // 'movie' is the name of the prop used in <MovieCard … />
    const { movie } = this.props;
    return <div className="movie-card" >{movie.Title}</div>;
  }
}