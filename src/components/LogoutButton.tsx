import React, { useContext } from 'react';
import UserContext from '../contexts/user';

export default function LogoutButton() {
  const [, setUser] = useContext(UserContext) ?? [];

  function onClick() {
    if (setUser) {
      setUser(null);
    } else {
      console.error("Can't logout because setUser was not defined!");
    }
  }

  return (
    <button onClick={onClick} className="Button">
      Logout
    </button>
  );
}
