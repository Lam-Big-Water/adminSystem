import React, { useState } from "react";
import {useForm} from "react-hook-form";

import {useUser} from "./query/auth/useUser";
import {useUpdateUser} from "./query/auth/useUpdateUser";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdatePassword from "./UpdatePassword";

const Account = () => {


  return (
    <div className="flex flex-col gap-8 text-[var(--text-primary)] font-normal">

      <UpdateUserInfo />
      <UpdatePassword />
      
    </div>
  );
};

export default Account;
