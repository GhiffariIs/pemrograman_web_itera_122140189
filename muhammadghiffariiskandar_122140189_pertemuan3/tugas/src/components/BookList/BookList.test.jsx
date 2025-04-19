import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookList from './BookList';
import { BookProvider } from '../../context/BookContext';

describe('BookList Component', () => {
    const mockBooks = [
        { id: '1', title: 'Book One', author: 'Author One', status: 'owned' },
        { id: '2', title: 'Book Two', author: 'Author Two', status: 'reading' },
        { id: '3', title: 'Book Three', author: 'Author Three', status: 'toBuy' },
    ];

    const mockOnEdit = vi.fn();

    const renderWithProvider = (ui) => {
        return render(<BookProvider>{ui}</BookProvider>);
    };

    it('renders the BookList component with books', () => {
        renderWithProvider(<BookList books={mockBooks} onEdit={mockOnEdit} />);

        expect(screen.getByPlaceholderText('Search books or authors...')).toBeInTheDocument();
        expect(screen.getByText('All Books')).toBeInTheDocument();
        expect(screen.getByText('Book One')).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes('Author One'))).toBeInTheDocument();
    });

    it('filters books based on search term', () => {
        renderWithProvider(<BookList books={mockBooks} onEdit={mockOnEdit} />);

        const searchInput = screen.getByPlaceholderText('Search books or authors...');
        fireEvent.change(searchInput, { target: { value: 'Book Two' } });

        expect(screen.getByText('Book Two')).toBeInTheDocument();
        expect(screen.queryByText('Book One')).not.toBeInTheDocument();
    });

    it('filters books based on status', () => {
        renderWithProvider(<BookList books={mockBooks} onEdit={mockOnEdit} />);

        const filterSelect = screen.getByText('All Books').closest('select');
        fireEvent.change(filterSelect, { target: { value: 'reading' } });

        expect(screen.getByText('Book Two')).toBeInTheDocument();
        expect(screen.queryByText('Book One')).not.toBeInTheDocument();
    });

    it('displays no books message when no books match filters', () => {
        renderWithProvider(<BookList books={mockBooks} onEdit={mockOnEdit} />);

        const searchInput = screen.getByPlaceholderText('Search books or authors...');
        fireEvent.change(searchInput, { target: { value: 'Nonexistent Book' } });

        expect(screen.getByText('No books found. Try adjusting your filters or add some books!')).toBeInTheDocument();
    });

    it('calls onEdit when a book item is edited', () => {
        renderWithProvider(<BookList books={mockBooks} onEdit={mockOnEdit} />);

        // Ambil semua tombol "Edit" dan pilih tombol pertama
        const editButtons = screen.getAllByLabelText('Edit book');
        fireEvent.click(editButtons[0]); // Klik tombol "Edit" untuk buku pertama

        expect(mockOnEdit).toHaveBeenCalled();
    });
});