import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

// const LOGIN_MUTATION = gql`
//   mutation Login($loginInput: LoginUserInput!) {
//     login(loginInput: $loginInput) {
//       token
//     }
//   }
// `;

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  // const [login] = useMutation(LOGIN_MUTATION, {
  //   variables: {
  //     loginInput: {
  //       email: formState.email,
  //       password: formState.password,
  //     },
  //   },
  //   onCompleted: ({ login }) => {
  //     localStorage.setItem('AUTH_TOKEN', login.token);
  //     console.log(login);
  //     navigate('/');
  //   },
  // });

  return (
    <div>
      <h3>login</h3>
      <form
        method="post"
        onSubmit={(event) => {
          event.preventDefault();
          // login();
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
          placeholder="Choose a safe password"
        />
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
