import React, { useState } from 'react';
import Footer from './components/Footer';
import GlobalContextStore from './components/GlobalContextStore';
import Header from './components/Header';
import AppRouter from './components/AppRouter';
import './styles/App.css';

type Theme = 'theme-dark' | 'theme-light';

interface AppProps {}

function App({}: AppProps) {
  // TODO: theme reducer
  const [theme, setTheme] = useState<Theme>('theme-dark');

  return (
    <GlobalContextStore>
      <div className={`App ${theme}`}>
        <Header />
        <main className="Main">
          <AppRouter />
        </main>
        <Footer />
      </div>
    </GlobalContextStore>
  );
}

export default App;
