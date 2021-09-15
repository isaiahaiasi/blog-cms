import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import './App.css';
import Footer from './components/Footer';
import MainCMS from './components/MainCMS';
import MainLogin from './components/MainLogin';

type Theme = 'theme-dark' | 'theme-light';

interface AppProps {}

function App({}: AppProps) {
  // TODO: theme reducer
  const [theme, setTheme] = useState<Theme>('theme-dark');

  return (
    <div className={`App ${theme}`}>
      <Header />
      <MainLogin />
      {/* <MainCMS /> */}
      <Footer />
    </div>
  );
}

export default App;
