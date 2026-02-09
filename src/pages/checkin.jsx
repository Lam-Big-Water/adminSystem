import React from "react";
import CheckinDetail from "@/components/CheckinDetail";
import Caption from "@/components/Caption";

const CheckIn = () => {
  return (
    <div className="py-6 px-4 max-w-7xl w-full mx-auto">
      <Caption
        title="CheckinDetail"
        description="This is the customer reservation information. You can manage check-in and check-out procedures."
      ></Caption>
      <div className="w-full border-b border-border shadow-sm"></div>

      <CheckinDetail />
    </div>
  );
};

export default CheckIn;
