import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Card, FormControl } from 'react-bootstrap';
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Config from '../../config.js';

import './profile-view.scss';


export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState('');

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     Username: "",
  //     Password: "",
  //     Email: "",
  //     Birthdate: "",
  //     FavoriteMovies: [],
  //     UsernameError: "",
  //     EmailError: "",
  //     PasswordError: "",
  //     BirthdateError: "",
  //   };
  // }



  // componentDidMount() {
  //   let accessToken = localStorage.getItem('token');
  //   this.getUsers(accessToken);
  // }


  function getUsers(token) {
    let url = `${Config.API_URL}/users/` +
      localStorage.getItem('user');
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // this.setState({
        //   Username: response.data.Username,
        //   Password: response.data.Password,
        //   Email: response.data.Email,
        //   Birthday: response.data.Birthday,
        //   FavoriteMovies: response.data.FavoriteMovies,
        // });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // setUsername(input) {
  //   this.setState({
  //     username: input
  //   });
  // }

  // update user info
  function handleUpdate(e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    // console.log({ token });
    let user = localStorage.getItem("user");
    // console.log(this.state);
    // let setisValid = this.formValidation();
    // if (setisValid) {
    axios.put(`${Config.API_URL}/users/${user}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        const data = response.data;
        localStorage.setItem('user', data.Username);
        console.log(data);
        alert(user + " has been updated.");
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });

  }


  // remove favorite movie
  function removeFavorite(movie) {
    const token = localStorage.getItem("token");
    const url =
      // or movie.id?
      `${Config.API_URL}/users/${movie}` +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        // this.componentDidMount();
        // location.reload();
        alert(movie.Title + " has been removed from your Favorites.");
      });
  }


  // delete account
  function handleDeregister() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(`${Config.API_URL}/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  const formValidation = () => {
    const usernameError = {};
    const emailError = {};
    const passwordError = {};
    const birhdateError = {};
    let isValid = true;
    if (username.trim().length < 5) {
      usernameError.usernameShort = "Must be alphanumeric and contains at least 5 characters";
      isValid = false;
    }
    else if (password.trim().length < 4) {
      passwordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
      isValid = false;
    }
    else if (!email.includes(".") || !email.includes("@")) {
      emailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    else if (birthdate === '') {
      birhdateError.noBirthdate = "Please enter a birthdate";
      isValid = false;
    }
    return isValid;
  };


  // render() {
  const { user, movies } = props;
  // const { UsernameError, EmailError, PasswordError, BirthdateError } = this.state;
  // const FavoriteMovieList = movies.filter((movie) => {
  //   return this.state.FavoriteMovies.includes(movie._id);
  // });
  return (
    <div className="userProfile">
      <Container>
        <h1 className="justify-content-md-center mb-30" md={9}><span className="glyphicon glyphicon-user"></span>Your Profile</h1>
        <Row>
          <Col md={3}>
            <p>Username: {`${username}`}</p>
            <p>Email: {`${email}`}</p>
            <p>Birthday: {`${birthdate}`}</p>
            {/* <p>Favorite Movies: {`${favoriteMovies}`}</p> */}
          </Col>
        </Row>

        <Col md={9}>
          <h5 className="justify-content-md-center mb-30" md={9}><span className="glyphicon glyphicon-user"></span>Update Profile</h5>
          <Form>
            <div className="form-group">
              <label>
                <p>Username:</p>
                <input defaultValue={user} type="text" onChange={e => setUsername(e.target.value)}
                  placeholder="Change username" />
              </label>



              <div className="form-group">
                <label>
                  <p>Password:</p>
                  <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Change password" />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <p>Email:</p>
                  <input type="text" onChange={e => setEmail(e.target.value)} placeholder="Change email" />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <p>Birthdate:</p>
                  <input type="text" onChange={e => setBirthdate(e.target.value)} placeholder="Change birthdate" />
                </label>
              </div>

            </div>
            <Button type="submit" className="btn btn-primary mb-2" onClick={handleUpdate}>Update</Button>
            <Button className='button' variant='danger' onClick={handleDeregister}>
              Click Here to Deregister
            </Button>
          </Form>

          {/* <Col md={6}>
            <div id="favoriteMovies">

              <h5>Your Favorite Movies:</h5>
              {FavoriteMovies.map((movie) => {
                return (
                  <Card id="card" className="movie-card mb-2" text="white">
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Link to={`/movies/${movie._id}`} id="link">
                        {movie.Title}
                      </Link>
                      <Button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a"
                        onClick={removeFavorite(movie)}>
                      </Button>

                    </Card.Body>
                  </Card>
                );

              })}

            </div>
          </Col> */}


        </Col>

      </Container>
    </div >
  )
    ;


};


ProfileView.propTypes = {
  movies: PropTypes.array.isRequired
};

// ProfileView.propTypes = {
//   users: PropTypes.shape({
//     Username: PropTypes.string.isRequired,
//     Email: PropTypes.string.isRequired,
//     Birthdate: PropTypes.string,
//     FavoriteMovies: PropTypes.array,
//   }),
//   movies: PropTypes.array.isRequired,
// };