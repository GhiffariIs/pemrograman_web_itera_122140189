import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi, expect } from 'vitest'
import BookFilter from './BookFilter'

describe('BookFilter Component', () => {
    it('renders search input and status filter dropdown', () => {
        render(<BookFilter onFilter={vi.fn()} onSearch={vi.fn()} />)

        expect(screen.getByLabelText(/Search Books:/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Filter by Status:/i)).toBeInTheDocument()
    })

    it('calls onSearch when typing in the search input', () => {
        const onSearchMock = vi.fn()
        render(<BookFilter onFilter={vi.fn()} onSearch={onSearchMock} />)

        const searchInput = screen.getByLabelText(/Search Books:/i)
        fireEvent.change(searchInput, { target: { value: 'React' } })

        expect(onSearchMock).toHaveBeenCalledWith('React')
    })

    it('calls onFilter when selecting a status from the dropdown', () => {
        const onFilterMock = vi.fn()
        render(<BookFilter onFilter={onFilterMock} onSearch={vi.fn()} />)

        const statusDropdown = screen.getByLabelText(/Filter by Status:/i)
        fireEvent.change(statusDropdown, { target: { value: 'owned' } })

        expect(onFilterMock).toHaveBeenCalledWith('owned')
    })

    it('updates the search input value when typing', () => {
        render(<BookFilter onFilter={vi.fn()} onSearch={vi.fn()} />)

        const searchInput = screen.getByLabelText(/Search Books:/i)
        fireEvent.change(searchInput, { target: { value: 'JavaScript' } })

        expect(searchInput.value).toBe('JavaScript')
    })

    it('updates the status dropdown value when selecting an option', () => {
        render(<BookFilter onFilter={vi.fn()} onSearch={vi.fn()} />)

        const statusDropdown = screen.getByLabelText(/Filter by Status:/i)
        fireEvent.change(statusDropdown, { target: { value: 'wishlist' } })

        expect(statusDropdown.value).toBe('wishlist')
    })
})