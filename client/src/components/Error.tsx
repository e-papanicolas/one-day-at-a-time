import React from 'react';

type Props = {
  error: string;
};

// TODO: should i make a custom error class? probably
// add a close button, or some way to get rid of the error, maybe a timeout

const Error = ({ error }: Props) => {
  return (
    <div>
      <p>{error}</p>
    </div>
  );
};

export default Error;
