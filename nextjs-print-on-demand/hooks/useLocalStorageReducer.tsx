import { useEffect, useReducer, useRef, Reducer } from 'react';
import { Cart, UpdateCartAction } from '../types/cart';

const useLocalStorageReducer = (key: string = '', reducer: Reducer<Cart, UpdateCartAction>, initialValue: Cart | null = null) => {
  const [state, dispatch] = useReducer(reducer, initialValue, () => {
    try {
      if (typeof window === 'object') {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    // Update local storage with new state
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Unable to store new value for ${key} in localStorage.`);
    }
  }, [state]);

  return {cart: state, dispatch};
};

export default useLocalStorageReducer;