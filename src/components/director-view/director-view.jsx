import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './director-view.scss';
import { MovieCard } from "../movie-card/movie-card";

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick, movie, directorsMovies } = this.props;
    // const directorsMovies = movie.map(movies => movies.director.Name === director.Name);

    return (
      <div className="director-view">
        <h1 className="director-name">
          {/* <h5><span className="label">Director: </span> */}
          <h1><span className="value display-4 text-white">{director.Name}</span></h1>
        </h1>
        <h4 className="director-bio">
          {/* <span className="label">Bio: </span> */}
          <span className="value">{director.Bio}</span>
        </h4>
        <h4 className="director-birth">
          <span className="label">Born: </span>
          <span className="value">{director.Birth}</span>
        </h4>
        <div>
          <h4>Featured Movies:</h4>
        </div>

        <Col md={6}>
          <div id="directorsMovies">

            {/* <h5>Movies by this director:</h5> */}
            {directorsMovies.map(m => {
              return (
                <Col md={12} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              )
            })}
          </div>
        </Col>

        {/* <div className="director-movies mb-3">
          {directorsMovies.map(m => {
            if (m.Director && m.Director.Name === director.Name) {
              return (
                <div className="director-card text-center mb-2" lg={3} md={6} key={m._id}>
                  <Link to={`/movies/${m._id}`}>Movies</Link>
                </div>
              );
            }
          })}
        </div> */}
        <Button variant="secondary" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
};