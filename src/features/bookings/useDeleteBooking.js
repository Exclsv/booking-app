import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings'

export function useDeleteBooking() {
  const queryClient = useQueryClient()

  // https://tanstack.com/query/v4/docs/react/reference/useMutation
  // useMutation  is a hook provided by the React Query library that allows to easily perform mutation operations (such as creating, updating, or deleting data) and handle the state of the mutation in React components.
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    // mutationFn: id => deleteCabin(id)
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success('Booking successfully deleted')

      // to update the cache
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      })
    },
    onError: err => {
      toast.error(err.message)
      console.log('booking could not be deleted')
    }
  })

  return { isDeleting, deleteBooking }
}
