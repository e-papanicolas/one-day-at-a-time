import '../styles/App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../error-page';
import Home from '../components/home';
import Register from '../components/auth/register';
import Login from '../components/auth/login';

// const CURRENT_USER_QUERY = gql(`
//   query CurrentUser {
//     currentUser {
//       id
//       name
//       email
//     }
//   }
// `);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}

export default Root;
