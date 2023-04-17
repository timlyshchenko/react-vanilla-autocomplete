import { useEffect, useRef, useCallback } from 'react';

export const useDebouncedFn = <
  FnArgs extends unknown[]
>(time: number, fn: (...args: FnArgs) => unknown) => {
  const timerId = useRef<ReturnType<typeof setTimeout>>();

  const cancelIfAnyOngoing = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  }

  useEffect(() => cancelIfAnyOngoing, []);

  return useCallback((...args: FnArgs) => {
    cancelIfAnyOngoing();

    timerId.current = setTimeout(() => {
      fn(...args);
    }, time);
  }, [time, fn]);
};
