import React, { useContext } from 'react';
import UserContext from '../contexts/user';
import LogoutButton from './LogoutButton';

interface AppProps {}

function Header({}: AppProps) {
  const [user] = useContext(UserContext) ?? [];

  return (
    <div className="Header content-bar">
      <div className="btn-grp-left">
        <button className="Button">Home</button>
      </div>
      <div className="btn-grp-right">
        {user && <LogoutButton />}
        <button className="Button">Reader</button>
        <button className="Button dark">Github</button>
      </div>
    </div>
  );
}

export default Header;
