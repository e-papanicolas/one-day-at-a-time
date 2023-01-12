import { Outlet, useNavigate } from 'react-router-dom';
import Header from './HeaderComponent';
// import { UserContext } from './Root';
import React from 'react';
import Nav from './Nav';
import Error from './Error';

type Props = {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const App = ({ errors, setErrors }: Props) => {
  const navigate = useNavigate();

  // const user = React.useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="App">
      <Header handleLogout={handleLogout} />
      <Nav />

      {errors?.map((error) => {
        return <Error key={error} error={error} />;
      })}

      <Outlet />
    </div>
  );
};

export default App;
