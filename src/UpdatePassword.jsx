import React from "react";
import { useForm } from "react-hook-form";

import { useUpdateUser } from "./query/auth/useUpdateUser";

const UpdatePassword = () => {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 gap-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl">
        <div>
          <h2 className="text-lg font-bold">Update password</h2>
          <span className="text-[var(--text-second)] text-sm">
            Enter your new password below to update to your account
          </span>
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label htmlFor="currentPassword" className="flex flex-col flex-1 font-bold">
            New password (min 8 chars)
            <span className="text-xs text-red-400">{errors?.password?.message}</span>
          </label>

          <input
            id="currentPassword"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]"
            type="password"
            autoComplete="current-password"
            disabled={isUpdating}
            {...register("password", {
                required: "This field is required",
                minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                },
            })}
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label htmlFor="confirmPassword" className="flex flex-col flex-1 font-bold">
            Confirm password
            <span className="text-xs text-red-400">{errors?.confirmPassword?.message}</span>
          </label>

          <input
            autoComplete="new-password"
            id="confirmPassword"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]"
            type="password"
            disabled={isUpdating}
            {...register("confirmPassword", {
                required: "This field is required",
                validate: (value) =>
                    getValues().password === value || "Passwords need to match",
            })}
          />
        </div>

        <div className="w-full flex gap-4 pt-2 pb-2 justify-end">
          <button onClick={reset} type="reset" className="cursor-pointer text-[var(--color-primary)] bg-[var(--color-second)] border-[2px] border-[var(--color-border)] px-2 py-2 rounded-md">
            Cancel
          </button>
          <button disabled={isUpdating} className="cursor-pointer text-[var(--color-second)] bg-[var(--color-primary)] px-2 py-2 rounded-md border-[2px] border-[var(--color-border)]">
            Update password
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;
