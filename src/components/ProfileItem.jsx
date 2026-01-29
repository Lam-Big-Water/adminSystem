import React from "react";
import { useUser } from "../query/auth/useUser";

const ProfileItem = ({ children }) => {
  const { user } = useUser();
  const { fullName = "SamLam", avatar = "default-user.jpg" } =
    user?.user_metadata || {};

  return (
    <div className="flex items-center gap-2 p-2">
      <img
        className="w-10 h-10 rounded-lg"
        src={avatar}
        alt={`Avatar of ${fullName}`}
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-foreground text-sm font-medium">{fullName}</h2>
        <small className="text-xs text-muted-foreground">
          SamLamShowroom@.com
        </small>
      </div>
      {children}
    </div>
  );
};

export default ProfileItem;
