import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../server/auth";
import { ToastContext } from "../../context/Toast/ToastProvider";


export function useUpdateUser() {
  const queryClient = useQueryClient();
          const {createToast} = React.useContext(ToastContext);
  

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      console.log("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => createToast(err.message, "error"),
  });

  return { updateUser, isUpdating };
}
