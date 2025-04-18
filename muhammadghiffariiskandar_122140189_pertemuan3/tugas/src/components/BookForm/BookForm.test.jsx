import { render, screen, fireEvent } from '@testing-library/react'
import BookForm from './BookForm'

describe('BookForm', () => {
  const mockSubmit = jest.fn()
  const mockCancel = jest.fn()

  beforeEach(() => {
    render(<BookForm onSubmit={mockSubmit} onCancel={mockCancel} />)
  })

  it('renders the form with all fields', () => {
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Author')).toBeInTheDocument()
    expect(screen.getByLabelText('Status')).toBeInTheDocument()
    expect(screen.getByText('Add Book')).toBeInTheDocument()
  })

  it('shows error messages when form is submitted empty', () => {
    fireEvent.click(screen.getByText('Add Book'))
    
    expect(screen.getByText('Title is required')).toBeInTheDocument()
    expect(screen.getByText('Author is required')).toBeInTheDocument()
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when form is valid', () => {
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test Book' } })
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'Test Author' } })
    fireEvent.click(screen.getByText('Add Book'))
    
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Test Author',
      status: 'owned'
    })
  })

  it('renders with initial data when provided', () => {
    const initialData = {
      title: 'Existing Book',
      author: 'Existing Author',
      status: 'reading'
    }
    
    render(<BookForm onSubmit={mockSubmit} initialData={initialData} />)
    
    expect(screen.getByDisplayValue('Existing Book')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Existing Author')).toBeInTheDocument()
    expect(screen.getByDisplayValue('reading')).toBeInTheDocument()
    expect(screen.getByText('Update Book')).toBeInTheDocument()
  })

  it('calls onCancel when cancel button is clicked in edit mode', () => {
    const initialData = {
      title: 'Existing Book',
      author: 'Existing Author',
      status: 'reading'
    }
    
    render(<BookForm onSubmit={mockSubmit} initialData={initialData} onCancel={mockCancel} />)
    fireEvent.click(screen.getByText('Cancel'))
    
    expect(mockCancel).toHaveBeenCalled()
  })
})