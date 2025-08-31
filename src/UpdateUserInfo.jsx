import React, { useState } from "react";
import { useUser } from "./query/auth/useUser";
import { useUpdateUser } from "./query/auth/useUpdateUser";

const UpdateUserInfo = () => {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 gap-4 bg-[var(--color-block)] border-[1px] border-[var(--color-border)] rounded-2xl"
      >
        <div>
          <h2 className="text-lg font-bold">Update user data</h2>
          <span className="text-[var(--color-second)] text-sm">
            Enter your new full name & avatar below to update to your account
          </span>
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label htmlFor="emailAddress" className="font-bold flex-1">
            Email address
          </label>
          <input
            disabled={true}
            value={email}
            id="emailAddress"
            className="flex-1 px-2 py-2 text-[var(--text-second)] rounded-md bg-[var(--color-bg)] cursor-not-allowed border-[2px] border-[var(--color-border)]"
            type="email"
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label className="font-bold flex-1" htmlFor="fullName">
            Full name
          </label>
          <input
            disabled={isUpdating}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            id="fullName"
            className="flex-1 col-span-2 px-2 py-2 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]"
            type="text"
          />
        </div>

        <div className="flex items-center pt-2 pb-2">
          <label className="font-bold flex-1" htmlFor="avatar">
            Avatar image
          </label>
          <input
            disabled={isUpdating}
            id="avatar"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            type="file"
            className="flex-1 px-2 py-2 rounded-md bg-[var(--color-block)] border-[2px] border-[var(--color-border)]"
          />
        </div>

        <div className="w-full flex gap-4 pt-2 pb-2 justify-end">
          <button
            disabled={isUpdating}
            onClick={handleCancel}
            type="reset"
            className="cursor-pointer text-[var(--color-primary)] bg-[var(--color-second)] border-[2px] border-[var(--color-border)] px-2 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={isUpdating}
            className="cursor-pointer text-[var(--color-second)] bg-[var(--color-primary)] px-2 py-2 rounded-md border-[2px] border-[var(--color-border)]"
          >
            Update account
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateUserInfo;
