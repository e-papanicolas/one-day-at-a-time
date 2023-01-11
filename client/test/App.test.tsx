import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/components/Root';

test('renders learn app name', () => {
  render(<App />);
  const nameElement = screen.getByText(/One Day at a Time/i);
  expect(nameElement).toBeInTheDocument();
});
