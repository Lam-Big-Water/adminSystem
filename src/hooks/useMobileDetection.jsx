// hooks/useMobileDetection.js
import { useEffect } from "react";

export const useMobileDetection = (toggle, breakpoint = 640) => {


  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < breakpoint) toggle(false);
    };

    checkMobile(); // 初始检查
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, [toggle, breakpoint]);

};

