import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams()

  // filter
  const filterValue = searchParams.get('status') || 'all'
  const filter =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue, method: 'eq' }

  // sort
  const sortByRow = searchParams.get('sortBy') || 'startDate-desc'
  const [field, direction] = sortByRow.split('-')
  const sortBy = { field, direction }

  // pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))

  // query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error
  } = useQuery({
    // whenever the 'filter' changes it will automatically refetch the data
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page })
  })

  // pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE)
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 })
    })

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 })
    })

    

  return { isLoading, bookings, error, count }
}
