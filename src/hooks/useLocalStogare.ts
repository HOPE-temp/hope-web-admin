"use client";
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initValue: T | null): [T | null, (value: T | null) => void, boolean] {
  const [item, setItem] = useState<T | null>(initValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setItem(JSON.parse(stored));
      } catch {
        setItem(stored as unknown as T);
      }
    } else {
      saveItem(initValue);
    }
    setLoaded(true);
  }, []);

  function saveItem(value: T | null) {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {
        localStorage.setItem(key, value as unknown as string);
      }
    }
    setItem(value);
  }

  return [item, saveItem, loaded];
}