import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import BookItem from './BookItem';
import { useBookContext } from '../../context/BookContext';

vi.mock('../../context/BookContext', () => ({
    useBookContext: vi.fn(),
}));

describe('BookItem Component', () => {
    const mockDeleteBook = vi.fn();
    const mockOnEdit = vi.fn();

    const book = {
        id: '1',
        title: 'Test Book',
        author: 'Test Author',
        status: 'owned',
        notes: 'Test notes',
    };

    beforeEach(() => {
        useBookContext.mockReturnValue({
            deleteBook: mockDeleteBook,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders book details correctly', () => {
        render(<BookItem book={book} onEdit={mockOnEdit} />);

        expect(screen.getByText('Owned')).toBeInTheDocument();
        expect(screen.getByText('Test Book')).toBeInTheDocument();
        expect(screen.getByText('by Test Author')).toBeInTheDocument();
        expect(screen.getByText('Test notes')).toBeInTheDocument();
    });

    it('calls onEdit when edit button is clicked', () => {
        render(<BookItem book={book} onEdit={mockOnEdit} />);

        const editButton = screen.getByLabelText('Edit book');
        fireEvent.click(editButton);

        expect(mockOnEdit).toHaveBeenCalledWith(book);
    });

    it('shows confirmation dialog when delete button is clicked', () => {
        render(<BookItem book={book} onEdit={mockOnEdit} />);

        const deleteButton = screen.getByLabelText('Delete book');
        fireEvent.click(deleteButton);

        expect(screen.getByText('Cancel')).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('calls deleteBook when confirm delete is clicked', () => {
        render(<BookItem book={book} onEdit={mockOnEdit} />);

        const deleteButton = screen.getByLabelText('Delete book');
        fireEvent.click(deleteButton);

        const confirmButton = screen.getByText('Confirm');
        fireEvent.click(confirmButton);

        expect(mockDeleteBook).toHaveBeenCalledWith(book.id);
    });

    it('hides confirmation dialog when cancel delete is clicked', () => {
        render(<BookItem book={book} onEdit={mockOnEdit} />);

        const deleteButton = screen.getByLabelText('Delete book');
        fireEvent.click(deleteButton);

        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
        expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
    });

    it('renders correct status label and class', () => {
        const statuses = [
            { status: 'owned', label: 'Owned', class: 'status-owned' },
            { status: 'reading', label: 'Reading', class: 'status-reading' },
            { status: 'toBuy', label: 'Want to Buy', class: 'status-to-buy' },
        ];

        statuses.forEach(({ status, label, class: className }) => {
            render(<BookItem book={{ ...book, status }} onEdit={mockOnEdit} />);

            const statusElement = screen.getByText(label);
            expect(statusElement).toBeInTheDocument();
            expect(statusElement).toHaveClass(className);
        });
    });
});