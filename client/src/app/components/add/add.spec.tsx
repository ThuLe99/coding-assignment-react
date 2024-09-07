import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useDispatch } from 'react-redux';
import Add from './Add';

// Mock useDispatch
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Add Component', () => {
  const mockDispatch = jest.fn();
  const mockSetOpen = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  const columns: any = [
    { field: 'description', headerName: 'Description', type: 'text' },
    { field: 'assigneeId', headerName: 'Assignee ID', type: 'number' },
  ];

  it('renders the form correctly', () => {
    render(<Add slug="test-slug" columns={columns} setOpen={mockSetOpen} />);

    // Check if the form elements are rendered
    expect(screen.getByText('Add new ticket')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Assignee ID')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('handles form submission', () => {
    render(<Add slug="test-slug" columns={columns} setOpen={mockSetOpen} />);

    // Simulate filling the form
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Test Description' },
    });
    fireEvent.change(screen.getByLabelText('Assignee ID'), {
      target: { value: '1' },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText('Send'));

    // Ensure the dispatch function was called with create_request action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'tickets/create_request' });
  });
});
