import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { FavoritesView } from '../favorites-view/favorites-view'
import Config from '../../config.js';
// import './main-view.scss'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

export class MainView extends React.Component {

  // Initial state is set to null
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      userData: {}
    }
  }

  getMovies(token) {
    axios.get(`${Config.API_URL}/movies`, {
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

  getUsers(token, user) {
    axios.get(`${Config.API_URL}/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          userData: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
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

  // // When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` property to that movie
  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }


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
    // this.getUsers(authData.token, authData.user.Username);
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
    const { movies, user, history, userData } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Container>
            <Navbar bg="dark" variant="dark" fixed="top">
              <Link to={`/`}>
                <Navbar.Brand>Welcome to MyFlix!</Navbar.Brand>
              </Link>
              <Link to={`/users/${user}`}>
                <Button variant="link" className="navbar-link text-light">Profile</Button>
              </Link>
              <Link to={`/`}>
                <Button variant="link" className="navbar-link text-light"
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
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
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
              <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
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
            return <Col>
              <ProfileView onLoggedIn={user => this.onLoggedIn(user)}
                movies={movies} user={user}
                userData={userData}
                removeFavoriteMovie={this.removeFavoriteMovie}
                // // displays movies
                favoriteMovies={movies.filter(movie => userData.FavoriteMovies.includes(movie._id))}
                onBackClick={() => history.goBack()} />
              {/* <Row className="mt-5" md={8}>
                <FavoritesView userData={userData} movies={movies} history={history} />
              </Row> */}
            </Col>

          }} />

        </Row>
      </Router>
    );
  }
}

// // simplified with ternary operator
// render() {
//   const { movies, selectedMovie, user, register } = this.state;

// // if there is no user, the LoginView is rendered
// // if user is loggin in, user details are passed as a prop to the LoginView
// if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

// if (this.state.user === null)
//   return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

// if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

// // Before the movies have been loaded
// if (movies.length === 0) return <div className="main-view" />;

//     return (
//       <div className="main-view">
//         {/* If the state of `selectedMovie` is not null,
//         that selected movie will be returned
//         otherwise, all movies will be returned */}
//         {selectedMovie
//           ? (
//             <Container>
//               <Card class="shadow-lg p-3 mb-5 bg-white rounded">
//                 <Row md={{ cols: 2 }} className="justify-content-md-center cols: 2">
//                   <Col md={3} className="container-fluid cols: 2">
//                     <MovieView class="shadow p-3 mb-5 bg-white rounded" movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
//                   </Col>
//                 </Row>
//               </Card>
//             </Container>

//           )
//           : (
//             <Container>
//               <CardDeck class="shadow-lg p-3 mb-5 bg-white rounded">
//                 <Row md={{ cols: 2 }} className="justify-content-md-center cols: 2">
//                   <Col md={5} className="cols: 2" class="shadow-lg p-3 mb-5 bg-white rounded">
//                     {movies.map(movie => (
//                       <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
//                     ))}
//                   </Col>
//                 </Row>
//               </CardDeck>
//             </Container>
//           )
//         }
//       </div>
//     );
//   }
// }

export default MainView;