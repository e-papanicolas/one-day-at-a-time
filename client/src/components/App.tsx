import '../styles/App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../error-page';
import Home from './Home';
import Login from './Login';
import { gql } from '../__generated__';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';

const CURRENT_USER_QUERY = gql(`
  query CurrentUser {
    currentUser {
      id
      name
      email
    }
  }
`);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [],
  },
]);

interface IUser {
  id: number;
  name: string;
  email: string;
}

export const UserContext = React.createContext<IUser | undefined>(undefined);

function App() {
  const [currentUser, setCurrentUser] = useState<IUser>();

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    onCompleted: (data) => {
      setCurrentUser(data.currentUser);
    },
  });

  return (
    <UserContext.Provider value={currentUser}>
      {currentUser ? <RouterProvider router={router} /> : <Login />}
    </UserContext.Provider>
  );
}

export default App;
