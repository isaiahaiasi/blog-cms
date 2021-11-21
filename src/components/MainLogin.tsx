import React, { FormEvent, useContext, useEffect, useState } from 'react';
import type { User } from 'src/utils/User';
import UserContext from '../contexts/user';
import useFetch from '../hooks/useFetch';
import '../styles/MainLogin.scss';
import { getLoginEndpoint } from '../utils/routeGetters';

export default function MainLogin() {
  const [, setUser] = useContext(UserContext) ?? [];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { callFetch, body } = useFetch(getLoginEndpoint(), {
    credentials: 'include',
  });

  useEffect(() => {
    async function handleUserLogin() {
      if (!body || !body.content) {
        console.log('no body.user...');
        return;
      }

      setUser
        ? setUser(body.content as User)
        : console.error('UserContext has not defined setUser function!');
    }

    handleUserLogin();
  }, [body]);

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    callFetch('POST', { username, password });
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
            required
          />
        </label>
        <label>
          <div>Password:</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="Button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
