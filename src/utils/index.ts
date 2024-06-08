import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQueryParams(url: string = window.location.href): Record<string, string>{
  const urlObj = new URL(url);
  const params = new URLSearchParams(urlObj.search);
  const queryParams = {} as Record<string, string>;

  for(const param of params) {
      queryParams[param[0]] = param[1];
  }

  return queryParams;
}
