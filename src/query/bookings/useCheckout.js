import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../server/apiBookings";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      console.log(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => console.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
