import { createContext, useContext } from "react";
import type { TranslationDict } from "./translations/en";
import { en } from "./translations/en";

export type Locale = "en" | "cs";

export const LOCALES: Locale[] = ["en", "cs"];

export type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDict;
};

export const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function useT() {
  return useContext(I18nContext);
}

export function plural(count: number, singular: string, pluralForm: string) {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}
