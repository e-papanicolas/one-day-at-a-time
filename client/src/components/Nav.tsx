import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  handleLogout: () => void;
};

const Nav = (props: Props) => {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/new-entry">New entry</Link>
      <Link to="/" onClick={props.handleLogout}>
        Logout
      </Link>
    </div>
  );
};

export default Nav;
