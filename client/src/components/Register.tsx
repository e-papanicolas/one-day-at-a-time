import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { gql } from '../__generated__';

type Props = {};

const REGISTER_MUTATION = gql(`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      name
      email
    }
  }
`);

// TODO: work on this component - register should also log in the user

const Register = (props: Props) => {
  // const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [register, { data, loading, error }] = useMutation(REGISTER_MUTATION, {
    variables: {
      createUserInput: {
        name: formState.name,
        email: formState.email,
        password: formState.password,
      },
    },
    onCompleted: (registerResponse) => {
      console.log(registerResponse);
    },
  });

  return (
    <div>
      <h3>register</h3>
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          register();
        }}
      >
        <input
          value={formState.name}
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value,
            })
          }
          type="text"
          placeholder="Your name"
        />
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
          placeholder="Choose a safe password"
        />
        <button type="submit">register</button>
      </form>
    </div>
  );
};

export default Register;
