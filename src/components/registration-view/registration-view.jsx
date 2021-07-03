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

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
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
          if (error.response && error.response.status === 400) {
            alert('The value you entered is not valid.')
          }
        });
      console.log(username, password, email, birthdate);
      props.onRegister(username, password, email, birthdate);
    };
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



  return (
    <Form handleSubmit={handleSubmit}>
      {/* <Form onClick={handleSubmit}> */}
      <div className="form-group">
        <label>
          <p>Username:</p>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label>
          <p>Password:</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label>
          <p>Email:</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
      </div>
      <div className="form-group">
        <label>
          <p>Birthdate:</p>
          <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        </label>
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
    birthdate: PropTypes.string,
  }),
  onRegister: PropTypes.func,
};