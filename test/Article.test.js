import React from 'react';
import { render, screen } from '@testing-library/react';
import Article from './Article'; // Import your Article component

test('Article component renders properly', () => {
  // Mock any dependencies or props needed for the component
  const setting = {
    url: 'example-url',
    // Add other necessary properties
  };

  render(<Article setting={setting} />);

  // Write assertions to test the rendered output
  expect(screen.getByText('Loading...')).toBeInTheDocument(); // Adjust as needed
});

// Add more test cases for various component behaviors
