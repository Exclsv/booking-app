import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const {bookingId} = useParams()

  const {
    isLoading,
    data: booking,
    error
  } = useQuery({
    // as long as bookingId changes the next query will run
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false
  })

  return {isLoading, booking, error}
}