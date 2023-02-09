import { Outlet } from 'react-router-dom';
import Header from './Header';
// import { UserContext } from './Root';
import React from 'react';
import Nav from './Nav';
import Error from './Error';

import { client } from '../index';

type Props = {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const App = ({ errors, setErrors }: Props) => {
  // const navigate = useNavigate();

  // const user = React.useContext(UserContext);

  const handleLogout = () => {
    client.resetStore();
  };

  return (
    <div className="App">
      <Header />
      <Nav handleLogout={handleLogout} />

      {errors?.map((error) => {
        return <Error key={error} error={error} />;
      })}

      <Outlet />
    </div>
  );
};

export default App;
