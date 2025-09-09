import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useMount } from 'react-use'
import { toast } from 'sonner'

import { Avatar } from '@/shared/components/avatar'
import { Button } from '@/shared/components/layout/button'
import { Spinner } from '@/shared/components/spinner'
import { Path } from '@/shared/constants/path.ts'
import { useCustomers } from '@/shared/hooks/use-customers'

export const CustomerDetails = () => {
  const navigate = useNavigate()
  const { email } = useParams<{ email: string }>()

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
      navigate(Path.HOME, { replace: true })
    },
  })

  useMount(fetchCustomersMutate)

  const customer = customers.find((c) => c.email.toLowerCase() === email)

  useEffect(() => {
    if (isFetchCustomersSuccess && !Object.keys(customer || {}).length) {
      toast.error('Customer not found')
      navigate(Path.HOME, { replace: true })
    }
  }, [isFetchCustomersSuccess, customer, navigate])

  if (isFetchCustomersPending) return <Spinner />
  if (!customer) return null

  return (
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

        <div className='space-y-6'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Contact Details
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  Email
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.email || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4'>
              Address Details
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  Gender
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.gender || 'N/A'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  Country
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.country || 'N/A'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  City
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.city || 'N/A'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  State
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.state || 'N/A'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  Street
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.street || 'N/A'}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-200'>
                  Street Number
                </label>
                <p className='text-gray-600 dark:text-gray-400'>{customer.streetNumber || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <Button
            onClick={() => navigate(Path.HOME)}
            className='h-9 px-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
            style={{ cursor: 'pointer' }}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  )
}
