import { useEffect, useState } from "react";

const STORAGE_KEY = "username";

export const useUsername = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setUsername(saved);
  }, []);

  const saveUsername = (value: string) => {
    setUsername(value);
    localStorage.setItem(STORAGE_KEY, value);
  };

  const clearUsername = () => {
    setUsername("");
    localStorage.removeItem(STORAGE_KEY);
  };

  return { username, saveUsername, clearUsername };
};
