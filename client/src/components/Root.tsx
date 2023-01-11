import '../styles/App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../utils/error-page';
import Login from './Login';
import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';
import React, { useState } from 'react';
import EntryForm from './EntryForm';
import { User } from '../__generated__/graphql';
import App from './App';
import EntryComponent from './Entry';

// TODO: what to do about password? do i need to make a new type?

const CURRENT_USER_QUERY = gql(`
  query CurrentUser {
    currentUser {
      id
      name
      email
      password
      entries {
        id
        date
        image_url
        userId
        notes {
          id
          content
          entryId
        }
      }
    }
  }
`);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/new-entry',
        element: <EntryForm />,
      },
      {
        path: '/entry/:entryId',
        element: <EntryComponent />,
      },
    ],
  },
]);

export const UserContext = React.createContext<User | undefined>(undefined);

function Root() {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY, {
    onCompleted: (data) => {
      console.log(data);
      setCurrentUser(data.currentUser);
    },
  });

  if (!currentUser) {
    return <Login />;
  }

  return (
    <UserContext.Provider value={currentUser}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default Root;
