import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatIndianNumber(number:number) {
  // Use 'en-IN' as the locale for Indian numbering system
  const formattedNumber = number.toLocaleString('en-IN');
  return formattedNumber;
}
