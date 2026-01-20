import React from "react";
import { useMoveBack } from "@/hooks/useMoveBack";

const NotFount = () => {
  const moveBack = useMoveBack();
  return (
    <div className="w-full h-screen flex flex-col gap-2 justify-center items-center bg-background text-foreground">
      <h1 className="text-[7rem] leading-tight font-bold">404</h1>
      <span className="font-medium">Oops! Page Not Found!</span>
      <p className="max-w-md text-muted-foreground font-medium text-center">
        It seems like the page you're looking for does not exist or might have
        been removed.
      </p>

      <div>
        <button onClick={moveBack} className="flex items-center gap-1 text-sm font-medium text-primary-foreground bg-primary  py-2 px-3 rounded-md hover:bg-primary/90 transition-colors duration-200">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFount;
