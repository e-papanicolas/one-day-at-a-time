import '../styles/App.css';
import { Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { gql } from '../__generated__';

const CURRENT_USER_QUERY = gql(`
  query CurrentUser {
    currentUser {
      id
      name
      email
    }
  }
`);

function Root() {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>One Day at a Time</h1>

        <h2>{data?.currentUser.name}'s photo a day journal</h2>
      </header>
      <Outlet />
    </div>
  );
}

export default Root;
