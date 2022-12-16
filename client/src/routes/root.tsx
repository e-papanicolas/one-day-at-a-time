import React from 'react';
import '../styles/App.css';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>One Day at a Time</h1>
        <h2>a photo a day journal</h2>
      </header>
      <Outlet />
    </div>
  );
}

export default Root;
