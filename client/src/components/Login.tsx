import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '../__generated__';
import { Outlet } from 'react-router-dom';

type Props = {
  errors: string[];
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
};

const LOGIN_MUTATION = gql(`
  mutation Login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`);

const Login = ({ errors, setErrors }: Props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [loginMutation, { data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: formState.email,
        password: formState.password,
      },
    },
    onError: (error) => {
      setErrors([...errors, error.message]);
    },
  });

  if (data) {
    localStorage.setItem('token', data.login.token);
    console.log(localStorage.getItem('token'));
  }

  return (
    <div>
      <h3>login</h3>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          loginMutation();
        }}
      >
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Your password"
        />
        <button type="submit">login</button>
      </form>
      <Outlet />
    </div>
  );
};

export default Login;
