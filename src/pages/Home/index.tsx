import { useQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Avatar } from '@/shared/components/avatar'
import { Input } from '@/shared/components/input'
import { Button } from '@/shared/components/layout/button'
import { Spinner } from '@/shared/components/spinner'
import { Table, type TableColumn } from '@/shared/components/table'
import { useCustomers } from '@/shared/hooks/use-customers'

import type { ICustomer } from '@/models/customer'

export const HomePage = () => {
  const parentRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [country, setCountry] = useState<string>('')

  const { fetchCustomers } = useCustomers()

  const {
    data: customers = [],
    isLoading: isFetchCustomersPending,
    isSuccess: isFetchCustomersSuccess,
    isError,
    error,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load customers', {
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      })
    }
  }, [isError, error])

  const filteredCustomers = customers.filter((customer) => {
    const matchesFirstName =
      !firstName || customer.firstName?.toLowerCase().includes(firstName.toLowerCase())
    const matchesLastName =
      !lastName || customer.lastName?.toLowerCase().includes(lastName.toLowerCase())
    const matchesEmail = !email || customer.email?.toLowerCase().includes(email.toLowerCase())
    const matchesCountry =
      !country || customer.country?.toLowerCase().includes(country.toLowerCase())

    return matchesFirstName && matchesLastName && matchesEmail && matchesCountry
  })

  const resetFilters = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setCountry('')
  }

  const navigateToCustomer = (customer: ICustomer) => {
    navigate(`/customer/${customer.email}`)
  }

  const rowVirtualizer = useVirtualizer({
    count: filteredCustomers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  const columns: TableColumn<ICustomer>[] = [
    {
      key: 'avatar',
      header: 'Avatar',
      className: 'w-[60px] text-center sticky top-0 bg-white dark:bg-gray-800',
      render: (_: unknown, row: ICustomer) => <Avatar seed={row.email} />,
    },
    {
      key: 'firstName',
      header: 'First Name',
      className: 'w-[150px] sticky top-0 bg-white dark:bg-gray-800',
    },
    {
      key: 'lastName',
      header: 'Last Name',
      className: 'w-[150px] sticky top-0 bg-white dark:bg-gray-800',
    },
    {
      key: 'email',
      header: 'E-mail',
      className: 'w-[150px] sticky top-0 bg-white dark:bg-gray-800',
    },
    {
      key: 'country',
      header: 'Country',
      className: 'min-w-[250px] truncate sticky top-0 bg-white dark:bg-gray-800',
    },
  ]

  if (isFetchCustomersPending) return <Spinner />

  return (
    isFetchCustomersSuccess && (
      <>
        <div className='mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col sm:flex-row sm:items-end gap-4'>
            <div className='flex-1 min-w-0'>
              <label
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'
                htmlFor='firstName'
              >
                First Name
              </label>
              <Input
                id='firstName'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder='Filter by first name'
                className='mt-1 w-full'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <label
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'
                htmlFor='lastName'
              >
                Last Name
              </label>
              <Input
                type='text'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Filter by last name'
                className='mt-1 w-full'
                id='lastName'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <label
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'
                htmlFor='email'
              >
                Email
              </label>
              <Input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Filter by email'
                className='mt-1 w-full'
                id='email'
              />
            </div>
            <div className='flex-1 min-w-0'>
              <label
                className='block text-sm font-medium text-gray-700 dark:text-gray-200'
                htmlFor='country'
              >
                Country
              </label>
              <Input
                type='text'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder='Filter by country'
                className='mt-1 w-full'
                id='country'
              />
            </div>
            <Button
              onClick={resetFilters}
              className='h-9 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            >
              Reset Filters
            </Button>
          </div>
        </div>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'>
          <div
            ref={parentRef}
            style={{ height: 'calc(100vh - 300px)', overflowY: 'auto', contain: 'strict' }}
          >
            <Table
              caption='Customers list'
              columns={columns}
              data={filteredCustomers}
              virtualizer={rowVirtualizer}
              onRowClick={(customer: ICustomer) => navigateToCustomer(customer)}
            />
          </div>
        </div>
      </>
    )
  )
}
