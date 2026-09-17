import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { pl } from "./translations/pl";
import { en } from "./translations/en";
import { de } from "./translations/de";
import { polishTypography } from "./typography";

export type Language = "pl" | "en" | "de";

const translations = { pl, en, de } as const;

type TranslationKeys = typeof pl;

type NestedKeyOf<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string | string[]
    ? `${Prefix}${K}`
    : T[K] extends Record<string, unknown>
    ? NestedKeyOf<T[K], `${Prefix}${K}.`>
    : never;
}[keyof T & string];

type TranslationKey = NestedKeyOf<TranslationKeys>;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  tList: <T = Record<string, string>>(key: string) => T[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);
}

const GERMAN_COUNTRIES = ["DE", "AT", "CH", "LI", "LU"];

const fallbackLanguageContext: LanguageContextType = {
  language: "pl",
  setLanguage: (lang: Language) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  },
  t: (key: string): string => {
    const fallback = getNestedValue(translations.pl as unknown as Record<string, unknown>, key);
    return typeof fallback === "string" ? polishTypography(fallback) : key;
  },
  tArray: (key: string): string[] => {
    const fallback = getNestedValue(translations.pl as unknown as Record<string, unknown>, key);
    return Array.isArray(fallback) ? (fallback as string[]) : [];
  },
  tList: <T,>(key: string): T[] => {
    const fallback = getNestedValue(translations.pl as unknown as Record<string, unknown>, key);
    return Array.isArray(fallback) ? (fallback as T[]) : [];
  },
};

const detectLanguageFromCountry = (country: string): Language => {
  const code = country.toUpperCase();
  if (code === "PL") return "pl";
  if (GERMAN_COUNTRIES.includes(code)) return "de";
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "de" || saved === "pl") return saved;
    }
    return "pl";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  };

  // Auto-detect language by IP country on first visit (no saved preference)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("lang")) return;

    let cancelled = false;
    fetch("https://ipapi.co/country/")
      .then((res) => (res.ok ? res.text() : Promise.reject()))
      .then((country) => {
        if (cancelled) return;
        const detected = detectLanguageFromCountry(country.trim());
        setLanguageState(detected);
        localStorage.setItem("lang", detected);
        document.documentElement.lang = detected;
      })
      .catch(() => {
        // Fallback: browser language
        if (cancelled) return;
        const browserLang = navigator.language?.toLowerCase() ?? "";
        let detected: Language = "en";
        if (browserLang.startsWith("pl")) detected = "pl";
        else if (browserLang.startsWith("de")) detected = "de";
        setLanguageState(detected);
        localStorage.setItem("lang", detected);
        document.documentElement.lang = detected;
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const fix = (value: string) => (language === "pl" ? polishTypography(value) : value);

  const t = (key: string): string => {
    const val = getNestedValue(translations[language] as unknown as Record<string, unknown>, key);
    if (typeof val === "string") return fix(val);
    // Fallback to Polish
    const fallback = getNestedValue(translations.pl as unknown as Record<string, unknown>, key);
    if (typeof fallback === "string") return polishTypography(fallback);
    return key;
  };

  const tArray = (key: string): string[] => {
    const val = getNestedValue(translations[language] as unknown as Record<string, unknown>, key);
    if (Array.isArray(val)) return (val as string[]).map(fix);
    const fallback = getNestedValue(translations.pl as unknown as Record<string, unknown>, key);
    if (Array.isArray(fallback)) return (fallback as string[]).map(polishTypography);
    return [];
  };

  const tList = <T,>(key: string): T[] => {
    const val = getNestedValue(translations[language] as unknown as Record<string, unknown>, key);
    if (Array.isArray(val)) return val as T[];
    const fallback = getNestedValue(translations.pl as unknown as Record<string, unknown>, key);
    if (Array.isArray(fallback)) return fallback as T[];
    return [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray, tList }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  return ctx ?? fallbackLanguageContext;
};
