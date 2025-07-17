import { useRef, useCallback, useEffect } from "react";

function useDebounce(fn, delay) {
  const timer = useRef();

  // Clean up timer on unmount
  useEffect(() => {
    return () => clearTimeout(timer.current);
  }, []);

  const debouncedFn = useCallback(
    (...args) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
}

export default useDebounce;