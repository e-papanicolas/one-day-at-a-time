import { Outlet, useNavigate } from 'react-router-dom';
import Login from './auth/login';
import { useState } from 'react';
import Header from './header';

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />

      <Outlet />
    </div>
  );
};

export default Home;
