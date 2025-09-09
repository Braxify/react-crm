import { useMutation } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { useMount } from 'react-use'
import { toast } from 'sonner'

import { useCustomers } from './hooks/use-customers'

import { Avatar } from '@/shared/components/avatar'
import { Spinner } from '@/shared/components/spinner'
import { Table, type TableColumn } from '@/shared/components/table'

import type { ICustomer } from '@/models/customer'

export const HomePage = () => {
  const parentRef = useRef<HTMLDivElement>(null)

  const { fetchCustomers } = useCustomers()

  const {
    data: customers = [],
    mutate: fetchCustomersMutate,
    isPending: isFetchCustomersPending,
    isSuccess: isFetchCustomersSuccess,
  } = useMutation({
    mutationFn: fetchCustomers,
    onError: (err) => {
      toast.error('Failed to load customers', {
        description: err instanceof Error ? err.message : 'Unknown error occurred',
      })
    },
  })

  useMount(fetchCustomersMutate)

  const rowVirtualizer = useVirtualizer({
    count: customers.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  })

  const columns: TableColumn<ICustomer>[] = [
    {
      key: 'avatar',
      header: 'Avatar',
      className: 'w-[60px] text-center',
      render: (_: unknown, row: ICustomer) => <Avatar seed={row.email} />,
    },
    { key: 'firstName', header: 'First Name', className: 'w-[150px]' },
    { key: 'lastName', header: 'Last Name', className: 'w-[150px]' },
    { key: 'email', header: 'E-mail', className: 'min-w-[250px] truncate' },
  ]

  if (isFetchCustomersPending) return <Spinner />

  return (
    isFetchCustomersSuccess && (
      <div ref={parentRef} style={{ height: '600px', overflowY: 'auto', contain: 'strict' }}>
        <Table
          caption='Customers list'
          columns={columns}
          data={customers}
          virtualizer={rowVirtualizer}
        />
      </div>
    )
  )
}
