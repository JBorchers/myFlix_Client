import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import './main-view.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

export class MainView extends React.Component {

  // Initial state is set to null
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  // a method passed as a prop
  // when a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    // stores logged in user and token - saved in user state
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://borchers-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // simplified with ternary operator
  render() {
    const { movies, selectedMovie, user, register } = this.state;

    // if there is no user, the LoginView is rendered
    // if user is loggin in, user details are passed as a prop to the LoginView
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    // if (this.state.user === null)
    //   return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/* If the state of `selectedMovie` is not null,
        that selected movie will be returned
        otherwise, all movies will be returned */}
        {selectedMovie
          ? (
            <Container>
              <Card class="shadow-lg p-3 mb-5 bg-white rounded">
                <Row md={{ cols: 2 }} className="justify-content-md-center cols: 2">
                  <Col md={3} className="container-fluid cols: 2">
                    <MovieView class="shadow p-3 mb-5 bg-white rounded" movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                  </Col>
                </Row>
              </Card>
            </Container>

          )
          : (
            <Container>
              <CardDeck class="shadow-lg p-3 mb-5 bg-white rounded">
                <Row md={{ cols: 2 }} className="justify-content-md-center cols: 2">
                  <Col md={5} className="cols: 2" class="shadow-lg p-3 mb-5 bg-white rounded">
                    {movies.map(movie => (
                      <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    ))}
                  </Col>
                </Row>
              </CardDeck>
            </Container>
          )
        }
      </div>
    );
  }
}
