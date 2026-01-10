// hooks/useDebounce.js
import { useRef } from 'react';

export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);
  
  return (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}