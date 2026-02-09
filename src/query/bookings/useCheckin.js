import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../server/apiBookings";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../context/Toast/ToastProvider";


export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
    const { createToast } = React.useContext(ToastContext);
  

  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      createToast(`Booking ID:${data.id} successfully checked in`, "success");
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (err) => createToast(err.message, "error"),
  });

  return { checkin, isCheckingIn };
}
