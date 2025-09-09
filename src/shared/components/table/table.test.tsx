import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, vi } from 'vitest'

import { Table } from '.'

interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}

const mockData: User[] = [
  { id: 1, name: 'User1', email: 'user1@gmail.com', status: 'active' },
  { id: 2, name: 'User2', email: 'user2@gmail.com', status: 'inactive' },
]

const mockColumns = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  {
    key: 'status',
    header: 'Status',
    render: (value: unknown, row: User) => (
      <span style={{ color: value === 'active' ? 'green' : 'red' }}>
        {row.status.toUpperCase()}
      </span>
    ),
  },
]

describe('Table', () => {
  it('should render table with headers and data correctly', () => {
    render(<Table columns={mockColumns} data={mockData} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()

    expect(screen.getByText('User1')).toBeInTheDocument()
    expect(screen.getByText('user1@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('User2')).toBeInTheDocument()
    expect(screen.getByText('user2@gmail.com')).toBeInTheDocument()
  })

  it('should call onRowClick with correct data when a row is clicked', () => {
    const handleRowClick = vi.fn()
    render(<Table columns={mockColumns} data={mockData} onRowClick={handleRowClick} />)

    const userOneRow = screen.getByText('User1').closest('tr')
    if (userOneRow) {
      fireEvent.click(userOneRow)
    }

    expect(handleRowClick).toHaveBeenCalledTimes(1)
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0], 0)
  })

  it('should render custom content using the render function', () => {
    render(<Table columns={mockColumns} data={mockData} />)

    const activeStatus = screen.getByText('ACTIVE')
    const inactiveStatus = screen.getByText('INACTIVE')

    expect(activeStatus).toBeInTheDocument()
    expect(inactiveStatus).toBeInTheDocument()

    // rgb of green color
    expect(activeStatus).toHaveStyle('color: rgb(0, 128, 0)')

    // rgb of red color
    expect(inactiveStatus).toHaveStyle('color: rgb(255, 0, 0)')
  })

  it('should render with a caption if provided', () => {
    const captionText = 'Caption text'
    render(<Table columns={mockColumns} data={mockData} caption={captionText} />)
    expect(screen.getByText(captionText)).toBeInTheDocument()
  })
})
