import { useMutation } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import dayjs from 'dayjs'
import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useMount } from 'react-use'
import { toast } from 'sonner'

import { useOrders } from './hooks/use-orders'

import { Avatar } from '@/shared/components/avatar'
import { Button } from '@/shared/components/layout/button'
import { Spinner } from '@/shared/components/spinner'
import { Table, type TableColumn } from '@/shared/components/table'
import { Path } from '@/shared/constants/path'
import { useCustomers } from '@/shared/hooks/use-customers'

import type { IOrder } from '@/models/order'

export const CustomerDetails = () => {
  const navigate = useNavigate()
  const { email } = useParams<{ email: string }>()

  const { fetchCustomers } = useCustomers()
  const { fetchOrders } = useOrders()

  const parentRef = useRef<HTMLDivElement>(null)

  // Customers
  const {
    data: customers = [],
    mutate: fetchCustomersMutate,
    isPending: isFetchCustomersPending,
    isSuccess: isFetchCustomersSuccess,
  } = useMutation({ mutationFn: fetchCustomers })

  useMount(fetchCustomersMutate)

  const customer = customers.find((c) => c.email.toLowerCase() === email?.toLowerCase())

  // Orders
  const {
    data: orders = [],
    mutate: fetchOrdersMutate,
    isPending: isFetchOrdersPending,
    isSuccess: isFetchOrdersSuccess,
  } = useMutation({
    mutationFn: fetchOrders,
    onError: (err) => {
      toast.error('Failed to load orders', {
        description: err instanceof Error ? err.message : 'Unknown error occurred',
      })
    },
  })

  useMount(fetchOrdersMutate)

  const rowVirtualizer = useVirtualizer({
    count: orders.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 38,
  })

  useEffect(() => {
    if (isFetchCustomersSuccess && !customer) {
      toast.error('Customer not found')
      navigate(Path.HOME, { replace: true })
    }
  }, [isFetchCustomersSuccess, customer, navigate])

  // TODO: check th at the dates are correct
  const orderColumns: TableColumn<IOrder>[] = [
    { key: 'number', header: 'Number', className: 'w-[100px]' },
    { key: 'amount', header: 'Amount', className: 'w-[100px]' },
    {
      key: 'createdAt',
      header: 'Created At',
      className: 'w-[160px]',
      render: (value: unknown) =>
        value ? dayjs(value as string).format('DD.MM.YYYY HH:mm') : 'N/A',
    },
    {
      key: 'shippedAt',
      header: 'Shipped At',
      className: 'w-[160px]',
      render: (value: unknown) =>
        value ? dayjs(value as string).format('DD.MM.YYYY HH:mm') : 'N/A',
    },
  ]

  if (isFetchCustomersPending || isFetchOrdersPending) return <Spinner />
  if (!customer) return null

  return (
    isFetchCustomersSuccess && (
      <div className='p-6 max-w-3xl mx-auto'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6'>
          <div className='flex items-center mb-8'>
            <Avatar seed={customer.email} className='w-16 h-16 mr-4' />
            <div>
              <h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>
                {customer.firstName} {customer.lastName}
              </h1>
              <p className='text-sm text-gray-500 dark:text-gray-400'>Customer Details</p>
            </div>
          </div>
          <div className='space-y-6 mb-8'>
            <div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Contact Details
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>Email: {customer.email}</p>
            </div>
            <div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Address Details
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Country: {customer.country || 'N/A'}
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                State: {customer.state || 'N/A'} {customer.state || ''}
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                Post Code: {customer.state || 'N/A'} {customer.postCode || ''}
              </p>
              <p className='text-gray-600 dark:text-gray-400'>City: {customer.city || 'N/A'}</p>
              <p className='text-gray-600 dark:text-gray-400'>
                Street: {customer.street || 'N/A'} {customer.street || ''}
              </p>
              <p className='text-gray-600 dark:text-gray-400'>
                Street Number: {customer.street || 'N/A'} {customer.streetNumber || ''}
              </p>
            </div>
            <div>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
                Additional info
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>Gender: {customer.gender}</p>
            </div>
          </div>
          {isFetchOrdersSuccess && (
            <div className='mt-6'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                Orders
              </h2>
              <div
                ref={parentRef}
                style={{ height: '400px', overflowY: 'auto', contain: 'strict' }}
              >
                <Table
                  columns={orderColumns}
                  data={orders}
                  virtualizer={rowVirtualizer}
                  onRowClick={(order) => toast(`order #${order.number}`)}
                />
              </div>
            </div>
          )}
          <div className='mt-8'>
            <Button onClick={() => navigate(Path.HOME)} style={{ cursor: 'pointer' }}>
              Back
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
