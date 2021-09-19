import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MainCMS from './components/MainCMS';
import MainLogin from './components/MainLogin';

import UserContext from './contexts/user';

import './styles/App.css';
import type { Nullable } from './utils/Nullable';
import type { User } from './utils/User';
import useStickyState from './hooks/useStickyState';

type Theme = 'theme-dark' | 'theme-light';

interface AppProps {}

function App({}: AppProps) {
  // TODO: theme reducer
  const [theme, setTheme] = useState<Theme>('theme-dark');

  const [user, setUser] = useStickyState<Nullable<User>>(null, 'USER_INFO');
  const isLoggedIn = () => user && user._id;

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div className={`App ${theme}`}>
        <Header />
        <main className="Main">
          <Router>
            <Route path="/">
              {isLoggedIn() ? (
                <Redirect to="/editor" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              <MainLogin />
            </Route>
            <Route path="/editor">
              <MainCMS />
            </Route>
          </Router>
        </main>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
