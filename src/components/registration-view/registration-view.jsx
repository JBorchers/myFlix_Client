import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  }

  return (
    <form>
      <div class="form-group">
        <label>
          <p>Username:</p>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div class="form-group">
        <label>
          <p>Password:</p>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div class="form-group">
        <label>
          <p>Email:</p>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
      </div>
      <div class="form-group">
        <label>
          <p>Birthdate:</p>
          <input type="text" value={birthdate} onChange={e => setBirthdate(e.target.value)} />
        </label>
      </div>
      <button type="submit" class="btn btn-primary mb-2" onClick={handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};