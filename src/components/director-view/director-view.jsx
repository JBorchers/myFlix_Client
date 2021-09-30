import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import './director-view.scss';
import { MovieCard } from "../movie-card/movie-card";

import { connect } from 'react-redux';

export class DirectorView extends React.Component {


  render() {
    const { director, onBackClick, movie, directorsMovies } = this.props;

    return (
      <div className="director-view">
        <h1 className="director-name">
          <h1><span className="text-white">{director.Name}</span></h1>
        </h1>
        <h4 className="director-bio text-white">
          <span className="value">{director.Bio}</span>
        </h4>
        <h4 className="director-birth text-white">
          <span className="label">Born: </span>
          <span className="value">{director.Birth}</span>
        </h4>
        <h4 className="text-white">Featured Movies:</h4>

        <Col md={6}>
          <div id="directorsMovies">

            {directorsMovies.map(m => {
              return (
                <Col md={12} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              );
            })}
          </div>
        </Col>

        <Button variant="info" size="sm" onClick={() => { onBackClick(null); }}>Back</Button>
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

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps)(DirectorView)