import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

import './App.css';
import Editor from './components/Editor';
import Footer from './components/Footer';

type Theme = 'theme-dark' | 'theme-light';

interface AppProps {}

function App({}: AppProps) {
  // TODO: theme reducer
  const [theme, setTheme] = useState<Theme>('theme-dark');

  return (
    <div className={`App ${theme}`}>
      <Header />
      <main className="Main">
        <Sidebar />
        <Editor />
      </main>
      <Footer />
    </div>
  );
}

export default App;
