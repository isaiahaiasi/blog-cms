import React from 'react';
import './MainLogin.scss';

export default function MainLogin() {
  return (
    <div className="login-container">
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
    </div>
  );
}
