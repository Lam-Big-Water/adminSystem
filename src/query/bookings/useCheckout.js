import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../server/apiBookings";
import { ToastContext } from "../../context/Toast/ToastProvider";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { createToast } = React.useContext(ToastContext);

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      createToast(`Booking ID:${data.id} successfully checked out`, "success");

      queryClient.invalidateQueries({ active: true });
    },

    onError: (err) => createToast(err.message, "error"),
  });

  return { checkout, isCheckingOut };
}
