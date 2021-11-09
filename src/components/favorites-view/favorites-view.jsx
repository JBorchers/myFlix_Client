
import React from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import Config from '../../config.js';

import { Link } from "react-router-dom";

// import './favorite-movies.scss';

export class FavoritesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  removeFavorite(movie) {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    let url =
      `${Config.API_URL}/users/${user}/movies/${movie._id}`
    axios
      .delete(url, null, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been removed from your Favorites.");
      });
  }

  render() {
    const favoriteMovies = this.props.userData.FavoriteMovies;
    const { movies } = this.props;

    return (
      
        <Card className='movie-card shadow-sm mb-3'>
        <h2 className="profile-title d-flex justify-content-center text-danger mt-3">Your Favorite Movies</h2>
        <Row className="fav-movies">
          {favoriteMovies.length === 0 && <div>You don't have any favorite movies yet!</div>}
          <div className='favorite-movies__container justify-content-center'>
            {favoriteMovies.length > 0 && movies.filter(movie => {
              return movie._id === favoriteMovies.find((favMovie) => favMovie === movie._id)
            }).map((movie) => {
                  return (
                    <div key={movie._id} className="favorites-container-item">
                    <Col md={12} style={{ margin: '1em' }}>
                      <Link to={`/movies/${movie._id}`}>
                        <Card.Img className="fav-img" key={movie._id} src={movie.ImagePath} />
                      </Link>
                      <Card.Body className='movie-card-body'>
                        <Button className='remove-favorite' variant='danger' onClick={() => this.removeFavorite(movie)}> Remove
                        </Button>
                      </Card.Body>
                    </Col>
                    </div>
                  );
                })}
              </div>
            </Row>
          </Card>
    );
  }
}