import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, FormControl } from 'react-bootstrap';
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Config from '../../config.js';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import './profile-view.scss';


export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});


  function getUsers(token) {
    let url = `${Config.API_URL}/users/` +
      localStorage.getItem('user');
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // update user info
  function handleUpdate(e) {
    e.preventDefault()
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let isValid = formValidation();
    if (isValid) {
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
        })
    };

  }

  // remove favorite movie
  function removeFavorite(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`${Config.API_URL}/users/${user}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(movie.Title + " has been removed from your Favorites.");
        props.removeFavoriteMovie(movie._id);
        console.log(response);
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
        alert(user + ", you have deregistered.");
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
      emailError.emailNotEmail = "invalid email";
      isValid = false;
    }
    else if (birthdate === '') {
      birhdateError.noBirthdate = "Please enter a birthdate";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    return isValid;
  };



  // render() {
  const { user, movies, favoriteMovies } = props;

  console.log(props.userData);

  return (
    <div className="userProfile">
      <Container>
        <h1 className="text-white">Your Profile</h1>

        <Col md={9}>
          <Form>
            <div className="form-group">
              <label><h4 className="text-white">Username:</h4></label>
              <Form.Control type="text" defaultValue={props.userData.Username} onChange={e => setUsername(e.target.value)} />
              {Object.keys(usernameError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {usernameError[key]}
                  </div>
                );
              })}
            </div>

            <div className="form-group">
              <label><h4 className="text-white">Email:</h4></label>
              <Form.Control type="email" defaultValue={props.userData.Email} onChange={e => setEmail(e.target.value)}
              />
              {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {emailError[key]}
                  </div>
                );
              })}
            </div>

            <div className="form-group">
              <Form.Label><h4 className="text-white">Birthday</h4></Form.Label>
              <Form.Control type="date" defaultValue={props.userData.Birthdate} onChange={e => setBirthdate(e.target.value)} />
            </div>

            <div className="form-group">
              <label><h4 className="text-white">Password</h4></label>
              <Form.Control type="password" value={password} placeholder="Enter a new password" onChange={e => setPassword(e.target.value)}
              />
              {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {passwordError[key]}
                  </div>
                );
              })}
            </div>


            <Button type="submit" className='button' variant='info' onClick={handleUpdate}>Update your information</Button>
            <Button className='button' variant='danger' onClick={handleDeregister}>
              Click Here to Deregister
            </Button>

          </Form>

          <h1 className="text-white">MyFlix Favorites:</h1>
          <Row>
            <Col className="d-flex flex-row mb-3">
              <div id="favoriteMovies">


                {favoriteMovies.map((movie, i) => {
                  return (
                    <Card className="shadow p-3 mb-5 bg-white rounded" key={i}>
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.ReleaseDate}</Card.Text>
                        <Link to={`/movies/${movie._id}`}>
                          <Button variant="info">Open</Button>
                        </Link>
                        <Button variant="danger" onClick={() => removeFavorite(movie)} >Remove</Button>
                      </Card.Body>
                    </Card>
                  );

                })}

              </div>
            </Col>
          </Row>


        </Col>

      </Container>
    </div >
  )
    ;


};

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,

};

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps, { setUser })(ProfileView);