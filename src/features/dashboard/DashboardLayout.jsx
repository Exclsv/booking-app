import styled from 'styled-components'
import { useRecentBookings } from './useRecentBookings'
import Spinner from '../../ui/Spinner'
import { useRecentStays } from './useRecentStays'
import Stats from './Stats'
import { useCabins } from '../cabins/useCabins'
import SalesChart from './SalesChart'

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

export default function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings()
  const {
    stays,
    confirmedStays,
    isLoading: isLoadingStays,
    numDays
  } = useRecentStays()
  const { cabins, isLoading: isLoadingCabins } = useCabins()

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCout={cabins.length}
      />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}