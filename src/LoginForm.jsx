import React, {useState} from "react";
import {useLogin} from './query/auth/useLogin'

const LoginForm = () => {
  const [email, setEmail] = useState("samlam@showcase.com");
  const [password, setPassword] = useState("123123123");
  const { login, isLoading } = useLogin();

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
    <div className="max-w-[390px] text-[var(--text-primary)] font-normal bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-4">
        <div>
          <h2 className="text-lg font-bold">Login to your account</h2>
          <span className="text-[var(--text-second)] text-sm">Enter your email below to login to your account</span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold pt-4 pb-2">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="m@example.com" className="px-2 py-2 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]" type="email" />
        </div>

        <div className="flex flex-col">
          <div className="flex font-bold pt-4 pb-2">
          <label htmlFor="password">Password</label>
          <a className="cursor-pointer font-normal ml-auto">Forgot your password?</a>
          </div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="m@example.com" className="col-span-2 px-2 py-2 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]" type="password" />
        </div>

        <div className="flex flex-col gap-4 pt-4 pb-2">
          <button className="cursor-pointer text-[var(--color-second)] bg-[var(--color-primary)] border-[2px] border-[var(--color-border)] px-2 py-2 rounded-md">{isLoading ? "Wait..." : "Login"}</button>
          <button className="cursor-pointer px-2 py-2 rounded-md text-[var(--color-primary)] bg-[var(--color-block)] border-[2px] border-[var(--color-border)]">Login with Google</button>
        </div>

        <p className="text-center">
          Don't have an account? <a className="underline cursor-pointer">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
