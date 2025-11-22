import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { currencies } from "./currencies";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lowerCaseFirstLetter(str: string) {
  return str[0].toLowerCase() + str.slice(1);
}
export function upperCaseFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function getInitials(input: string): string {
  // Split the input by space
  const words = input.trim().split(" ");

  if (words.length === 0) return "";

  // Take the first letter of the first word
  const firstInitial = words[0][0].toUpperCase();

  // Take the first letter of the second word if it exists
  const secondInitial = words[1] ? words[1][0].toUpperCase() : "";

  return firstInitial + secondInitial;
}

export function capitalizeTwoWords(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// convert currency code to symbol

export function getCurrencySymbol(code: string) {
  const currency = currencies.find((c) => c.code === code);
  return currency ? currency.symbol : code;
}
export function truncateText(note: string | undefined, maxLength: number) {
  if (!note) return "";
  if (note.length <= maxLength) return note;

  return note.slice(0, maxLength) + "...";
}
