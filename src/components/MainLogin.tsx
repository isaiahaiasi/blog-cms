import React, { FormEvent, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import '../styles/MainLogin.scss';

export default function MainLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { callFetch, response } = useFetch(
    'http://localhost:3000/api/auth/login',
    {
      credentials: 'include',
    },
  );

  useEffect(() => {
    response?.json().then(console.log).catch();
  }, [response]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    callFetch({ username, password });
  }

  return (
    <div className="login-container">
      <form className="form login-form" onSubmit={handleFormSubmit}>
        <label>
          <div>Username:</div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <div>Password:</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="Button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
