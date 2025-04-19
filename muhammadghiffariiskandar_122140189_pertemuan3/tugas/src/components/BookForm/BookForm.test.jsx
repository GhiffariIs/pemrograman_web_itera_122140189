import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import BookForm from './BookForm';
import { BookContext } from '../../context/BookContext';

// filepath: src/components/BookForm/BookForm.test.jsx

describe('BookForm Component', () => {
  const mockAddBook = vi.fn();
  const mockEditBook = vi.fn();
  const mockOnClose = vi.fn();

  const renderWithContext = (props) => {
    return render(
      <BookContext.Provider value={{ addBook: mockAddBook, editBook: mockEditBook }}>
        <BookForm {...props} />
      </BookContext.Provider>
    );
  };

  it('renders the form with all fields and buttons', () => {
    renderWithContext({ onClose: mockOnClose });

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Notes/i)).toBeInTheDocument();
    expect(screen.getByText(/Add New Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it('displays "Edit Book" when bookToEdit is provided', () => {
    renderWithContext({ bookToEdit: { id: '1', title: 'Test', author: 'Author', status: 'owned', notes: '' }, onClose: mockOnClose });

    expect(screen.getByText(/Edit Book/i)).toBeInTheDocument();
  });

  it('shows validation errors when required fields are empty', () => {
    renderWithContext({ onClose: mockOnClose });

    fireEvent.click(screen.getByText(/Add Book/i));

    expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Author is required/i)).toBeInTheDocument();
  });

  it('clears validation errors when valid input is provided', () => {
    renderWithContext({ onClose: mockOnClose });

    fireEvent.click(screen.getByText(/Add Book/i));
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Title' } });

    expect(screen.queryByText(/Title is required/i)).not.toBeInTheDocument();
  });

  it('calls addBook with correct data when adding a new book', () => {
    renderWithContext({ onClose: mockOnClose });

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'New Book' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'New Author' } });
    fireEvent.click(screen.getByText(/Add Book/i));

    expect(mockAddBook).toHaveBeenCalledWith({
      id: '',
      title: 'New Book',
      author: 'New Author',
      status: 'owned',
      notes: ''
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls editBook with correct data when editing an existing book', () => {
    renderWithContext({
      bookToEdit: { id: '1', title: 'Old Title', author: 'Old Author', status: 'owned', notes: '' },
      onClose: mockOnClose
    });

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Updated Title' } });
    fireEvent.click(screen.getByText(/Save Changes/i));

    expect(mockEditBook).toHaveBeenCalledWith({
      id: '1',
      title: 'Updated Title',
      author: 'Old Author',
      status: 'owned',
      notes: ''
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when the cancel button is clicked', () => {
    renderWithContext({ onClose: mockOnClose });

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});