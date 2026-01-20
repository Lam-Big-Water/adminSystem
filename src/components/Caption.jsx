import React from "react";

const Caption = ({children, title = "Example"}) => {
  return (
    <div className="flex justify-between font-medium mb-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        
      </div>
      {children}
    </div>
  );
};

export default Caption;
