import React, {useState} from "react";
import {useLogin} from './query/auth/useLogin'
import SpinnerMini from './SpinnerMini'

const LoginForm = () => {
  const [email, setEmail] = useState("samlam@showcase.com");
  const [password, setPassword] = useState("123123123");
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
    <div className="w-full flex justify-center p-6 mx-6 text-[var(--text-primary)] font-normal">
      <form onSubmit={handleSubmit} className="w-full max-w-128 flex flex-col p-5 gap-4">
        <div>
          <h2 className="text-3xl font-black pb-2">Login to your account</h2>
          <span className="text-[var(--text-second)] text-base">Enter your email below to login to your account</span>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="text-xl font-bold pt-4 pb-2">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder="m@example.com" className="text-lg px-4 py-3 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]" type="email" />
        </div>

        <div className="flex flex-col">
          <div className="flex font-bold pt-4 pb-2">
          <label htmlFor="password" className="text-xl">Password</label>
          <a className="text-base cursor-pointer font-normal ml-auto">Forgot your password?</a>
          </div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="m@example.com" className="text-lg px-4 py-3 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]" type="password" />
        </div>

        <div className="flex flex-col gap-4 pt-4 pb-2">
          <button className="flex justify-center items-center text-xl font-bold cursor-pointer text-[var(--color-second)] bg-[var(--color-primary)] border-[2px] border-[var(--color-border)] px-4 py-3 rounded-md">{isPending ? <SpinnerMini /> : "Login"}</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
