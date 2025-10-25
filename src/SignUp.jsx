import React from "react";
import { useForm } from "react-hook-form";

import { useSignUp } from "./query/auth/useSignUp";

const SignUp = () => {
  const { signUp, isPending } = useSignUp();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signUp(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <div className="text-[var(--text-primary)] font-normal bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5 gap-4 bg-[var(--color-block)] rounded-2xl"
      >
        <div>
          <h2 className="text-lg font-bold">Create a new user</h2>
          <span className="text-[var(--text-second)] text-sm">
            Enter your all info below to create your new account
          </span>
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label className="flex flex-col font-bold flex-1" htmlFor="fullName">
            Full name
            <span className="text-xs text-red-400">
              {errors?.fullName?.message}
            </span>
          </label>
          <input
            disabled={isPending}
            id="fullName"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="text"
            {...register("fullName", {required: "This field is required"})}
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label htmlFor="emailAddress" className="flex flex-col font-bold flex-1">
            Email address
            <span className="text-xs text-red-400">
              {errors?.emailAddress?.message}
            </span>
          </label>
          <input
            disabled={isPending}
            id="emailAddress"
            className="flex-1 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="email"
            {...register("emailAddress", {
                required: "This field is required",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Please provide a valid email address",
                },
            })}
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label
            htmlFor="password"
            className="flex flex-col flex-1 font-bold"
          >
            Password (min 8 characters)
            <span className="text-xs text-red-400">
              {errors?.password?.message}
            </span>
          </label>

          <input
            disabled={isPending}
            id="password"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="password"
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
          <label
            htmlFor="confirmPassword"
            className="flex flex-col flex-1 font-bold"
          >
            Repeat password
            <span className="text-xs text-red-400">
              {errors?.confirmPassword?.message}
            </span>
          </label>

          <input
            disabled={isPending}
            id="confirmPassword"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-bg)] border-[2px] border-[var(--color-border)]"
            type="password"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
        </div>

        <div className="w-full flex gap-4 pt-2 pb-2 justify-end">
          <button
            disabled={isPending}
            onClick={reset}
            type="reset"
            className="cursor-pointer text-[var(--color-primary)] bg-[var(--color-second)]  border-[2px] border-[var(--color-border)] px-2 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={isPending}
            className="cursor-pointer text-[var(--color-second)] bg-[var(--color-primary)]  px-2 py-2 rounded-md border-[2px] border-[var(--color-border)]"
          >
            Create new user
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
