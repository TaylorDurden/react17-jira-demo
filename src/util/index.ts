// !!"123"  相当于是   Boolean("123")    //结果为true

import { useEffect, useState } from "react";

// !!{a:1}  相当于是    Boolean({a:1})    //结果为true
export const isFalsy = (value: any) => (value === 0 ? false : !value);

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: any) => {
  useEffect(() => {
    callback();
    // TODO: 依赖项里加上callback会造成无线循环，这个和useCallback以及useMemo有关系
  }, []);
};

// 纯函数版防抖实现
const debounce = (func: any, delay: any) => {
  let timeout: any;
  return (...param: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...param);
    }, delay);
  };
};

// custom hook实现防抖
export const useDebounce = <V>(value: V, delay: any) => {
  const [debounceValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次value变化后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
  };
};
