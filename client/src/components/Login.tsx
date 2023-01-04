import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '../__generated__';

interface Props {}

const LOGIN_MUTATION = gql(`
  mutation Login($loginInput: LoginUserInput!) {
    login(loginInput: $loginInput) {
      token
    }
  }
`);

const Login = (props: Props) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const [loginMutation, { error, data }] = useMutation(LOGIN_MUTATION, {
    variables: {
      loginInput: {
        email: formState.email,
        password: formState.password,
      },
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
      {error && <p>{error.message}</p>}
    </div>
  );
};

export default Login;
