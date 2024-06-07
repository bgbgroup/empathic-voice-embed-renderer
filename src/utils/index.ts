import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getQueryParams(url : string): Record<string, string>{
  let urlObj = new URL(url);
  let params = new URLSearchParams(urlObj.search);
  let queryParams = {};

  for(let param of params) {
      queryParams[param[0]] = param[1];
  }

  return queryParams;
}
