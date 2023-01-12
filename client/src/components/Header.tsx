import React from 'react';

type Props = {
  handleLogout: () => void;
};

const Header = (props: Props) => {
  return (
    <header className="App-header">
      <h1>One Day at a Time</h1>
      <button onClick={props.handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
