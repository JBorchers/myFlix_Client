import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import ScrollToTop from '../scroll-to-top/scroll-to-top';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import Config from '../../config.js';
// import './main-view.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

class MainView extends React.Component {

  // Initial state is set to null
  constructor() {
    super();
    this.state = {
      userData: { FavoriteMovies: [] }
    }
  }

  getMovies(token) {
    axios.get(`${Config.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token, user) {
    axios.get(`${Config.API_URL}/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.props.setUser(response.data.Username)
        this.setState({
          userData: response.data
        });
        console.log('getUser response', response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('getUser reached')
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    let user = localStorage.getItem('user');
    if (accessToken !== null) {
      this.setState({
        user: user
      });
      this.getMovies(accessToken);
      this.getUsers(accessToken, user)
    }
  }

  // a method passed as a prop
  // when a user successfully logs in, this function updates the `user` property in state to that particular user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      userData: authData.user
    });

    // stores logged in user and token - saved in user state
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getUsers(authData.token, authData.user.Username);
  }


  onRegister(register) {
    console.log(register);
    this.setState({
      register,
    });
  }


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  removeFavoriteMovie = (id) => {
    let tempObj = { ... this.state.userData }
    tempObj.FavoriteMovies = tempObj.FavoriteMovies.filter(movie => movie !== id)
    this.setState({ userData: tempObj })

  }


  render() {
    const { user, history, userData } = this.state;
    const { movies } = this.props;

    return (
      <Router>
        <ScrollToTop />
        <Row className="main-view justify-content-md-center">
          <Container>
            <Navbar bg="dark" variant="dark" fixed="top" className="shadow">
              <Button variant="link" className="navbar-link ms-auto">
                <Link to={`/`}>
                  <Navbar.Brand >MyFlix</Navbar.Brand>
                </Link>
              </Button>
              <Link to={`/users/${user}`}>
                <Button variant="link" className="navbar-link text-light ms-auto"
              >Profile</Button>
              </Link>
              <Link to={`/`}>
                <Button variant="link" className="navbar-link text-light ms-end"
                  onClick={() => this.onLoggedOut()}
                >Logout</Button>
              </Link >
            </Navbar>
          </Container>

          {/* main view */}
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList />;
          }} />

          {/* registration view */}
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          {/* movie view */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* genre view */}
          <Route path="/genre/:name" render={({ match, history }) => {
            if (!user) return
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre}
                genresMovies={movies.filter(m => m.Genre.Name === match.params.name)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* director view */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                directorsMovies={movies.filter(m => m.Director.Name === match.params.name)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* profile view */}
          <Route path="/users/:username" render={() => {
            if (!user) return
            return <Col lg={12} md={12}>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies} user={user}
                userData={userData}
                removeFavoriteMovie={this.removeFavoriteMovie}
                // displays movies
                favoriteMovies={movies.filter(movie => userData.FavoriteMovies.includes(movie._id))}
                onBackClick={() => history.goBack()} />
            </Col>

          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

// wraps any stateful component to connect to a store
// follows this syntax:
// function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
export default connect(mapStateToProps, { setMovies, setUser })(MainView);