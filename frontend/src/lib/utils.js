import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * JavaScript utility ya event handler: `cn`.
 * Job portal ke browser-side mein ek focused operation handle karta hai.
 * Example: `cn(/* relevant value */);`
 */
/**
 * Utility/function: `cn`.
 * `cn` is component/hook ke focused UI ya state operation ko execute karta hai.
 * Example: `cn(actual arguments);`
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}