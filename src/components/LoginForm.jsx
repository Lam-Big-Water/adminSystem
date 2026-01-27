import React, { useState } from "react";
import { useLogin } from "../query/auth/useLogin";
import SpinnerMini from "@/SpinnerMini";
import { LogIn, GamepadDirectional } from "lucide-react";
import FormField from "@/FormField";
import FormFieldPassword from "@components/FormFieldPassword";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [email, setEmail] = useState("samlam@showcase.com");
  const [password, setPassword] = useState("123123123");
  const { login, isPending } = useLogin();

  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const onSubmit = () => {
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  };

  return (
    <div class="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8 bg-background text-foreground font-medium">
      <div className="flex justify-center items-center text-xl font-semibold mb-4 gap-1">
        <GamepadDirectional size={28} strokeWidth={2} />
        <h1 className="text-xl font-medium">ShadcnUI Style Admin</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 p-6 shadow-sm rounded-xl border"
      >
        <div>
          <h2 className="text-lg font-semibold">Sign in</h2>
          <span className="text-sm text-muted-foreground">
            Enter your email and password below to
            <br />
            log into your account
          </span>
        </div>

        <FormField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeHolder="name@example.com"
          label="Email"
          id="email"
          register={register}
          errors={errors}
          validationRules={{
            required: "Please enter your email",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email",
            },
          }}
        />
        <FormFieldPassword
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeHolder="********"
          label="Password"
          id="password"
          register={register}
          errors={errors}
          validationRules={{
            required: "This password is required!",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          }}
        />

        <button
          type="submit"
          className="h-9 px-4 py-2 bg-primary text-primary-foreground inline-flex items-center justify-center whitespace-normal rounded-md text-sm transition-color duration-100 cursor-pointer disabled:pointer-events-none hover:bg-primary/90 border-border focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
        >
          {isPending ? (
            <SpinnerMini />
          ) : (
            <span className="flex items-center gap-2">
              <LogIn /> Login
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
