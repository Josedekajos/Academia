import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import NavHeader from "../components/NavHeader";
// eslint-disable-next-line no-unused-vars
import React from 'react';

test('renders NavHeader component with correct content', () => {
  // Mock the userInfo prop to pass to the NavHeader component
  const mockUserInfo = {
    name: 'Imele Jose',
    avatar: '👤', // Example avatar (could be an image or text)
  };

  render(
    <BrowserRouter>  {/* Wrap with BrowserRouter */}
      <NavHeader userInfo={mockUserInfo} />  {/* Pass the mock userInfo */}
    </BrowserRouter>
  );

  // Check if 'Academia' (brand) and 'Imele Jose' (username) are in the document
  expect(screen.getByText('Academia')).toBeInTheDocument(); 
  expect(screen.getByText('Imele Jose')).toBeInTheDocument(); 
});
