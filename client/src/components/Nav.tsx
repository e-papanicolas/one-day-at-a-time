import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Nav = (props: Props) => {
  return (
    <div>
      Nav:
      <Link to="/new-entry">Create a new entry</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Nav;
