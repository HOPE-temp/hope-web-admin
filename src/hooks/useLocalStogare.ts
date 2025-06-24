"use client"
import { useEffect, useState } from 'react';


export function useLocalStorage<T> (key: string, initValue: T|null)
  : [ T | null, ( value: T | null ) => void ] {
  const [item, setItem] = useState<T | null>(initValue);

  function saveItem (value: T | null) {
    localStorage.setItem(key, JSON.stringify(value));
    setItem(value);
  };

  useEffect(() => {
    const foo = localStorage.getItem(key);

    if (foo) {
      setItem(JSON.parse(foo));
    } else {
      saveItem(initValue);
    }
  }, []);

  return [item, saveItem];
};

