import { useState, useEffect, useMemo } from "react";
import { I18nContext, type Locale, LOCALES } from "./index";
import { en } from "./translations/en";
import { cs } from "./translations/cs";

const STORAGE_KEY = "regex-gen-locale";

const dictionaries = { en, cs } as const;

function detectLocale(): Locale {
  if (typeof window === "undefined") return "en";

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LOCALES.includes(stored as Locale)) return stored as Locale;

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith("cs")) return "cs";
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => detectLocale());

  function setLocale(next: Locale) {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale] }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
