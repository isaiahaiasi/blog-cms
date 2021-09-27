import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
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
      <Route path="/editor">
        <MainCMS />
      </Route>
    </Router>
  );
}
