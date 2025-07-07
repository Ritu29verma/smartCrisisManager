import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const apiRequest = async (method, url, body) => {
  return fetch(import.meta.env.VITE_API_BASE_URL + url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
  });
};