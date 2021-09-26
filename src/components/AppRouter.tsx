import React, { useContext } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import UserContext from '../contexts/user';
import MainCMS from './MainCMS';
import MainLogin from './MainLogin';

export default function AppRouter() {
  const [user] = useContext(UserContext) ?? [];
  const isLoggedIn = () => user && user._id;

  return (
    <Router>
      <Route path="/">
        {isLoggedIn() ? <Redirect to="/editor" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <MainLogin />
      </Route>
      <Route exact path="/editor">
        <MainCMS />
      </Route>
      <Route path="/editor/:postid">
        <MainCMS />
      </Route>
    </Router>
  );
}
