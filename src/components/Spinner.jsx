import React from "react";
import { LoaderCircle } from 'lucide-react';


const Spinner = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
              <LoaderCircle size={84} strokeWidth={2} className="animate-spin"/>
    </div>
  );
};

export default Spinner;
