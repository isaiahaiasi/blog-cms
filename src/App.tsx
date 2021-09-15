import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import MainCMS from './components/MainCMS';
import MainLogin from './components/MainLogin';

import './styles/App.css';

type Theme = 'theme-dark' | 'theme-light';

interface AppProps {}

function App({}: AppProps) {
  // TODO: theme reducer
  const [theme, setTheme] = useState<Theme>('theme-dark');

  return (
    <div className={`App ${theme}`}>
      <Header />
      <main className="Main">
        <Router>
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
  );
}

export default App;
