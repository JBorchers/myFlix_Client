import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Config from '../../config.js';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  // const [birthdateError, setBirthdateError] = useState({});

  const formValidation = () => {
    const usernameError = {};
    const emailError = {};
    const passwordError = {};
    // const birhdateError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Must be alphanumeric and contains at least 5 characters";
      isValid = false;
    }
    else if (!username.match(/^[0-9a-zA-Z]+$/)) {
      usernameError.usernameNotAlphanumeric = "Username must only include alphanumeric symbols.";
      isValid = false;
    }
    else if (password.trim().length < 4) {
      passwordError.passwordMissing = "You must enter a password with a minimum of 4 characters ";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = formValidation();
    if (isValid) {
      axios.post(`${Config.API_URL}/users`, {
        Username: username,
        Password: password,
        Email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
          alert('You have sucessfully registered.');
        })
        .catch(e => {
          console.log('error registering the user')
        });
      console.log(username, password, email, birthdate);
      // props.onRegister(username, password, email, birthdate);
    };
  }

  return (
    <Form handleSubmit={handleSubmit}>
      {/* <Form onClick={handleSubmit}> */}
      <div className="form-group">
        <label>Username:</label>
        <Form.Control type="text" value={username} placeholder="Enter a unique username" onChange={e => setUsername(e.target.value)} />
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
        <Form.Control type="password" value={password} placeholder="Enter a Password" onChange={e => setPassword(e.target.value)}
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
        <Form.Control type="email" value={email} placeholder="Enter a valid Email (ex. user@email.com)" onChange={e => setEmail(e.target.value)}
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
        <Form.Control type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        {/* {Object.keys(birthdateError).map((key) => { */}
        {/* return (
            <div key={key} style={{ color: "red" }}>
              {birthdateError[key]}
            </div>
          );
        })} */}
      </div>
      <Button type="submit" className="btn btn-primary mb-2" onClick={handleSubmit}>Submit</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    birthdate: PropTypes.instanceOf(Date),
  }),
  // onRegister: PropTypes.func,
};