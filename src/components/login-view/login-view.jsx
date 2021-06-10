import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    props.onLoggedIn(username);
  };

  return (
    <form>
      <div class="form-group">
        <label>
          <p>Username:</p>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </label>
      </div>
      <div class="form-group">
        <label>
          <p>Password:</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        </label>
      </div>
      <div class="form-check">
        <input type="checkbox"></input>
        <label class="form-check-label">
          Remember me
    </label>
      </div>
      <div>
        {/* placeholder link to RegistrationView */}
        {/* <p>Not a member? <a href="#!">Register</a></p> */}
      </div>
      <button type="submit" class="btn btn-primary mb-2" onClick={e => handleSubmit(e)}>Submit</button>
    </form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func,
};