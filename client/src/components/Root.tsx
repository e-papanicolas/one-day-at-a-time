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
import NoteForm from './NoteForm';
import Register from './Register';

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

export const UserContext = React.createContext<User | undefined>(undefined);

function Root() {
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const router = createBrowserRouter([
    {
      path: '/',
      element:
        isLoggedIn || currentUser.email ? (
          <App
            errors={errors}
            setErrors={setErrors}
            setIsLoggedIn={setIsLoggedIn}
          />
        ) : (
          <Login
            errors={errors}
            setErrors={setErrors}
            setIsLoggedIn={setIsLoggedIn}
          />
        ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/new-entry',
          element: <EntryForm errors={errors} setErrors={setErrors} />,
        },
        {
          path: '/entry/:entryId',
          element: <EntryComponent errors={errors} setErrors={setErrors} />,
        },
        {
          path: '/new-note/:entryId',
          element: <NoteForm errors={errors} setErrors={setErrors} />,
        },
      ],
    },
    {
      path: '/register',
      element: <Register errors={errors} setErrors={setErrors} />,
      errorElement: <ErrorPage />,
    },
  ]);

  useQuery(CURRENT_USER_QUERY, {
    onCompleted: (data) => {
      console.log(data);
      setCurrentUser(data.currentUser);
    },
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });

  return (
    <UserContext.Provider value={currentUser}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default Root;
