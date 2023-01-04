import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import { UserContext } from './App';
import React from 'react';

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  const user = React.useContext(UserContext);
  console.log(user);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <h1>Home</h1>
      <Outlet />
    </div>
  );
};

export default Home;
