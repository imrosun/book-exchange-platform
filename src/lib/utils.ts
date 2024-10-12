import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// jwt 
export function getTokenFromCookies() {
  const cookies = document.cookie.split(';').reduce((acc: any, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name.trim()] = value;
    return acc;
  }, {});

  return cookies.token;
}

export function isLoggedIn() {
  const token = getTokenFromCookies();
  return !!token;
}

export const logout = (): void => {
  document.cookie = "token=; path=/; max-age=0;";
  window.location.href = "/login";
};

// utils/getCookie.ts
export function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

