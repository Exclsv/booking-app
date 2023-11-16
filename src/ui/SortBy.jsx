import { useSearchParams } from 'react-router-dom'
import Select from './Select'

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortByInitial = searchParams.get('sortBy') || ''

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return <Select options={options} value={sortByInitial} type='white' onChange={handleChange} />
}
