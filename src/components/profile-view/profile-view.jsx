import React from 'react';
import PropTypes from 'prop-types';
import { Card, FormControl } from 'react-bootstrap';
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Button, Form, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Config from '../../config.js';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthdate: "",
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUsers(accessToken);
  }

  getUsers(token) {
    let url = `${Config.API_URL}/users/` +
      localStorage.getItem('user');
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          users: response.data.username,
          password: response.data.password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          Favorites: response.data.Favorites,
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUpdate(e) {
    let token = localStorage.getItem("token");
    // console.log({ token });
    let user = localStorage.getItem("user");
    console.log(this.state);
    let setisValid = this.formValidation();
    if (setisValid) {
      axios.put(`${Config.API_URL}/users/`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthdate: this.state.Birthdate,
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
  }


  formValidation() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let BirthdateError = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameError.usernameShort = "Must be alphanumeric and contains at least 5 characters";
      isValid = false;
    }
    if (this.state.Password.trim().length < 3) {
      PasswordError.passwordMissing = "You must enter a current or new password.(minimum 4 characters) ";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    if (this.state.birthdate === '') {
      BirthdateError.birthdateEmpty = "Please enter your birthdate.";
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      BirthdateError: BirthdateError,
    })
    return isValid;
  };


  render() {
    const { user, movies } = this.props;
    const { UsernameError, EmailError, PasswordError, BirthdateError } = this.state;
    const FavoriteMovieList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });
    return (
      <div className="userProfile">
        <Container>
          <h1 className="justify-content-md-center mb-30" md={9}><span class="glyphicon glyphicon-user"></span>Edit Profile</h1>
          <Row>
            <Col md={3}>
              <p>Username: {`${this.props.user}`}</p>
              <p>Email: {`${this.state.Email}`}</p>
              <p>Birthday: {`${this.state.Birthday}`}</p>
            </Col>
          </Row>

          <Col md={9}>
            <Form className="justify-content-md-center mb-30">
              <h6 style={{ textAlign: "center" }}>Update Profile Details</h6>


            </Form>
          </Col>
        </Container>
      </div >
    )
  };

};

ProfileView.propTypes = {
  users: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string,
    Favorites: PropTypes.array,
  }),
  movies: PropTypes.array.isRequired,
};