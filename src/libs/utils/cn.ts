// cn.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines Tailwind CSS classes using `clsx` and merges them using `tailwind-merge`.
 * @param classes - A list of class names or objects with conditionally applied class names.
 * @returns A single string of combined class names.
 */
export function cn(...classes: (string | undefined | null | { [key: string]: any })[]): string {
    return twMerge(clsx(...classes));
}
