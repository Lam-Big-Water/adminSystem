import React, { useState } from "react";
import { useLogin } from "./query/auth/useLogin";
import SpinnerMini from "./SpinnerMini";
import { LogIn, EyeOff, Eye } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("samlam@showcase.com");
  const [password, setPassword] = useState("123123123");
  const [eye, setEye] = useState(false);
  const { login, isPending } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <div className="container grid h-svh max-w-none items-center justify-center">
    <div class="mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8 bg-background text-foreground">
      <h1 className="flex justify-center items-center text-xl font-semibold mb-4">
        ❖ Admin Dashboard
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-4 p-6 shadow-sm rounded-xl border"
      >
        <div>
          <h2 className="text-lg font-semibold">Sign in</h2>
          <span className="text-neutral-500 dark:text-stone-400 text-sm font-medium">
            Enter your email and password below to
            <br />
            log into your account
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm leading-none font-medium select-none"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="name@example.com"
            className="h-9 w-full min-w-0 placeholder:text-zinc-400 rounded-md border border-zinc-700 px-3 py-1 text-base shadow-xs transition-[color,box-shadow]"
            type="email"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="text-sm leading-none font-medium select-none"
            >
              Password
            </label>
            <a className="ml-auto text-neutral-500 dark:text-stone-400 text-sm font-medium hover:opacity-75 cursor-pointer">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="********"
              className="h-9 w-full min-w-0 placeholder:text-zinc-400 rounded-md border border-zinc-700 px-3 py-1 text-base shadow-xs transition-[color,box-shadow]"
              type={eye ? "text" : "password"}
            />
            <button
              onClick={() => setEye(!eye)}
              type="button"
              className="text-zinc-400 absolute end-2 top-1/2 w-6 h-6 -translate-y-1/2 cursor-pointer hover:text-black dark:hover:text-amber-50"
            >
              {eye ? <Eye size="20px" /> : <EyeOff size="20px" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="h-9 px-4 py-2 bg-black text-amber-50 dark:bg-amber-50 dark:text-black inline-flex items-center justify-center whitespace-normal rounded-md text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 hover:bg-black/80 dark:hover:bg-amber-50/90"
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
    </div>
  );
};

export default LoginForm;
