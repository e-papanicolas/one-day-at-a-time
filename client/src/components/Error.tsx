import React from 'react';

type Props = {
  error: string;
};

// TODO: should i make a custom error class? probably

const Error = ({ error }: Props) => {
  return <div>{error}</div>;
};

export default Error;
