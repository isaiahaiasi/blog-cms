import React, { useState, useEffect } from 'react';

interface AppProps {}

function Header({}: AppProps) {
  return (
    <div className="Header content-bar">
      <div className="btn-grp-left">
        <button className="Button">Home</button>
      </div>
      <div className="btn-grp-right">
        <button className="Button">Reader</button>
        <button className="Button dark">Github</button>
      </div>
    </div>
  );
}

export default Header;
