export const saveStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const removeStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};
