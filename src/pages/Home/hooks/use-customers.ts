import { getApiInstance } from '@/shared/api/api-instance'

import type { ICustomer } from '@/models/customer'

export type ICustomersResponse = ICustomer[]

export const useCustomers = () => {
  const api = getApiInstance()

  const fetchCustomers = async (): Promise<ICustomersResponse> => {
    const res = await api.get<ICustomersResponse>(`/customers.json`)
    return res.data
  }

  return {
    fetchCustomers,
  }
}
