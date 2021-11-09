import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Config from '../../config.js';
import { Link } from "react-router-dom";

// import './movie-view.scss';

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
        if(confirm('This movie has been added to your favorites list!'));
      }).then(
        // reloads page after click
        window.setTimeout(function(){location.reload()},3000)
      ).catch(
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
        <div className="movie-info">
          <h1 className="movie-title"><font size="+10">
            <span className="text-white">{movie.Title}</span></font>
          </h1>
          <h4 className="movie-description text-white">
            <span className="value">{movie.ReleaseDate}</span>
          </h4>
          <h4 className="movie-description text-white">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </h4>
          <h4 className="movie-description text-white">
            <span className="label">Director: </span>
            <Link className="text-white font-italic" to={`/directors/${movie.Director.Name}`}>
              <span className="value">{movie.Director.Name}</span>
            </Link>
          </h4>
          <h4 className="movie-description text-white">
            <span className="label">Genre: </span>
            <Link className="text-white font-italic" to={`/genre/${movie.Genre.Name}`}>
              <span className="value">{movie.Genre.Name}</span>
            </Link>
          </h4>
          <div className="">
            <Button variant='info' onClick={() => this.addFavorite(movie)} >Add to Favorites</Button>
          </div>
          <Button variant='info' onClick={onBackClick}>Back</Button>

        </div>
      </div >
    );
  }
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    genre: PropTypes.string,
    director: PropTypes.string,
    imagePath: PropTypes.string,
  }).isRequired
};