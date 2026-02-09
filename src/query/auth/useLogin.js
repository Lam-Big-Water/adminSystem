import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../server/auth";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../context/Toast/ToastProvider";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { createToast } = React.useContext(ToastContext);

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      createToast(err.message, "error");
    },
  });

  return { login, isPending };
}
