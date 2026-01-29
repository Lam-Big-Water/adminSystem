import React from "react";

const Caption = ({ children, title = "Example", description }) => {
  return (
    <div className="flex justify-between items-center font-medium mb-2">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
        {description && (
          <span className="text-sm text-muted-foreground">{description}</span>
        )}
      </div>
      {children}
    </div>
  );
};

export default Caption;
