import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});


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

  // const { birthdate } = userData;


  // componentDidMount() {
  //   let accessToken = localStorage.getItem('token')
  //   return getUsers(accessToken);
  // }


  function getUsers(token) {
    let url = `${Config.API_URL}/users/` +
      localStorage.getItem('user');
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // window.location.reload(false);
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
    let isValid = formValidation();
    if (isValid) {
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
        })
    };

  }

  // remove favorite movie
  function removeFavorite(movie) {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const url =
      // or movie.id?
      `${Config.API_URL}/users/${movie._id}` +
      localStorage.getItem("user") +
      "/movies/" +
      movie._id;
    axios
      .delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        alert(movie.Title + " has been removed from your Favorites.");
        // localStorage.removeItem("");
        props.removeFavoriteMovie(movie._id);
        console.log(response);
        // this.componentDidMount();
        // location.reload();

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
  // const { UsernameError, EmailError, PasswordError, BirthdateError } = this.state;
  // const favoriteMovies = movies.filter(m => {
  //   return favoriteMoviesList.indexOf(m._id) >= 0;
  // });

  console.log(props.userData);

  return (
    <div className="userProfile">
      <Container>
        <h1 className="display-4 text-muted">Your Profile</h1>
        {/* <Row>
          <Col md={3}>
            <p>Update your information</p>
            {/* <p>Username: {`${username}`}</p>
            <p>Email: {`${email}`}</p>*/}

        {/* <p>Favorite Movies: {`${favoriteMovies}`}</p> */}
        {/* </Col>
        </Row> */}

        <Col md={9}>
          {/* <h5 className="justify-content-md-center mb-30" md={9}><span className="glyphicon glyphicon-user"></span>Update Profile</h5> */}
          <Form>
            <div className="form-group">
              <label>Username:</label>
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
              <label><p>Password:</p></label>
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

            <div className="form-group">
              <label><p>Email:</p></label>
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
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" defaultValue={props.userData.Birthdate} onChange={e => setBirthdate(e.target.value)} />
            </div>


            <Button type="submit" className='button' variant='info' onClick={handleUpdate}>Update your information</Button>
            <Button className='button' variant='outline-danger' onClick={handleDeregister}>
              Click Here to Deregister
            </Button>

          </Form>

          <h3 className="display-4 text-muted">MyFlix Favorites:</h3>
          <Col className="col-6 col-md-6">
            <div id="favoriteMovies">


              {favoriteMovies.map((movie, i) => {
                return (
                  <Card className="shadow p-3 mb-5 bg-white rounded" key={i}>
                    <Card.Img variant="top" src={movie.ImagePath} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Card.Text>{movie.Description}</Card.Text>
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


        </Col>

      </Container>
    </div >
  )
    ;


};


// ProfileView.propTypes = {
//   movies: PropTypes.array.isRequired
// };

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
    FavoriteMovies: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,

};