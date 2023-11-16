import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins'

export function useDeleteCabin() {
  const queryClient = useQueryClient()

  // https://tanstack.com/query/v4/docs/react/reference/useMutation
  // useMutation  is a hook provided by the React Query library that allows to easily perform mutation operations (such as creating, updating, or deleting data) and handle the state of the mutation in React components.
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: id => deleteCabin(id)
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success('Cabin successfully deleted')

      // to update the cache
      queryClient.invalidateQueries({
        queryKey: ['cabins']
      })
    },
    onError: err => {
      toast.error(err.message)
      console.log('cabin could not be deleted')
    }
  })

  return { isDeleting, deleteCabin }
}
