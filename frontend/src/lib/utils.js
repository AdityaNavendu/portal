/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * JavaScript utility ya event handler: `cn`.
 * Job portal ke browser-side mein ek focused operation handle karta hai.
 * Example: `cn(/* relevant value */);`
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}