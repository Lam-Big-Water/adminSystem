import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../server/apiBookings";
import { ToastContext } from "../../context/Toast/ToastProvider";


export function useDeleteBooking() {
  const queryClient = useQueryClient();
    const { createToast } = React.useContext(ToastContext);
  

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      createToast("Booking successfully deleted", "success");
      queryClient.invalidateQueries({
        queryKey: ["bookings3"],
      });
    },
    onError: (err) => createToast(err.message, "error"),
  });

  return { isDeleting, deleteBooking };
}
