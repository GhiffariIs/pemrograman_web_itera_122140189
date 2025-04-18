import { render, screen, fireEvent } from '@testing-library/react'
import BookItem from './BookItem'

describe('BookItem', () => {
  const mockBook = {
    id: 1,
    title: 'Test Book',
    author: 'Test Author',
    status: 'owned'
  }
  
  const mockEdit = jest.fn()
  const mockDelete = jest.fn()

  beforeEach(() => {
    render(<BookItem book={mockBook} onEdit={mockEdit} onDelete={mockDelete} />)
  })

  it('renders book information correctly', () => {
    expect(screen.getByText('Test Book')).toBeInTheDocument()
    expect(screen.getByText('by Test Author')).toBeInTheDocument()
    expect(screen.getByText('Owned')).toBeInTheDocument()
  })

  it('calls onEdit when edit button is clicked', () => {
    fireEvent.click(screen.getByText('Edit'))
    expect(mockEdit).toHaveBeenCalled()
  })

  it('calls onDelete when delete button is clicked', () => {
    fireEvent.click(screen.getByText('Delete'))
    expect(mockDelete).toHaveBeenCalled()
  })

  it('displays correct status color and text', () => {
    const statusElement = screen.getByText('Owned')
    expect(statusElement).toHaveStyle('background-color: #2ecc71')
  })
})