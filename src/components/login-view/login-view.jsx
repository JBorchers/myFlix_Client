import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Config from '../../config.js';
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button, Form, Col, Row } from "react-bootstrap";

import './login-view.scss';

import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post(`${Config.API_URL}/login`, {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        // triggers onLoggedIn method in main-view.jsx
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
      });
  };

  return (
    <Container>
      <Col md={6}>
        <h1 className="text-white">Welcome to MyFlix!</h1>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Control type="text" className="shadow p-3 bg-white rounded" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <small id="emailHelp" className="form-text">We'll never share your email with anyone else.</small>
          </Form.Group>

          <Form.Group controlId="formPassword">

            <Form.Control type="password" className="shadow p-3 bg-white rounded" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />


          </Form.Group>
          <Button type="submit" variant="info" className="shadow" onClick={e => handleSubmit(e)}>Submit</Button>
          <Link to={`/register`} >
            <Button variant="info" className="shadow">New? Click here to sign up!</Button>
          </Link>
        </Form>
      </Col>
    </Container>
  )
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};