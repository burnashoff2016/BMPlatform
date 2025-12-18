const TOKEN_KEY = "digital-homeworks-token";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const saveToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};
