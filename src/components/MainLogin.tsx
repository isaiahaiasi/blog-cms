import React from 'react';
import './MainLogin.scss';

export default function MainLogin() {
  return (
    <main className="Main login-container">
      <form className="form login-form">
        <label>
          <div>Username:</div>
          <input type="text" id="username" />
        </label>
        <label>
          <div>Password:</div>
          <input type="password" id="password" />
        </label>
        <button className="Button" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
