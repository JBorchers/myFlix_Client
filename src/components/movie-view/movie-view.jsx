import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Config from '../../config.js';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  addFavorite(movie) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    axios.post(`${Config.API_URL}/users/${user}/movies/${movie._id}`, null, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(
      (response) => {
        console.log(response);
        alert('This movie has been added to your favorites list!');
      }).catch(
        function (error) {
          console.log(error)
          alert('There was an error.');
        }
      );
  }

  componentDidMount() {
    document.addEventListener('keypress', event => {
      console.log(event.key);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Release Date: </span>
          <span className="value">{movie.ReleaseDate}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-description">
          <span className="label">Director: </span>
          <Link className="link" to={`/directors/${movie.Director.Name}`}>
            <span className="value">{movie.Director.Name}</span>
          </Link>
        </div>
        <div className="movie-description">
          <span className="label">Genre: </span>
          <Link className="link" to={`movies/genre/${movie.Genre.Name}`}>
            <span className="value">{movie.Genre}</span>
          </Link>
        </div>
        <div className="">
          <Button className="btn btn-primary mb-2" variant='' onClick={() => this.addFavorite(movie)}>Add to Favorites</Button>
        </div>
        <button onClick={onBackClick}>Back</button>

      </div>
    );
  }
};

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string.isRequired,
//     genre: PropTypes.string.isRequired,
//     director: PropTypes.string.isRequired,
//     imagePath: PropTypes.string.isRequired,
//   }).isRequired
// };