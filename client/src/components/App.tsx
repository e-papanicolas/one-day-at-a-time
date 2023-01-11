import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
// import { UserContext } from './Root';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const App = (props: Props) => {
  const navigate = useNavigate();

  // const user = React.useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <Link to="/new-entry">Create a new entry</Link>
      <Outlet />
    </div>
  );
};

export default App;
