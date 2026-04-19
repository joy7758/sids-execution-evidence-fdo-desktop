import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "./en";
import zhCN from "./zh-CN";

const dictionaries = {
  "zh-CN": zhCN,
  en,
} as const;

type Dictionary = Record<string, unknown>;
export type Locale = keyof typeof dictionaries;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: string[]) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function lookup(dictionary: Dictionary, key: string): string {
  const result = key.split(".").reduce<unknown>((current, part) => {
    if (current && typeof current === "object" && part in current) {
      return (current as Record<string, unknown>)[part];
    }
    return undefined;
  }, dictionary);

  return typeof result === "string" ? result : key;
}

function interpolate(template: string, values: string[] = []): string {
  return values.reduce(
    (current, value, index) => current.split(`{${index}}`).join(value),
    template,
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh-CN");

  const value = useMemo<I18nContextValue>(() => {
    const dictionary = dictionaries[locale];

    return {
      locale,
      setLocale,
      t: (key: string, values?: string[]) =>
        interpolate(lookup(dictionary, key), values),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside LocaleProvider.");
  }
  return value;
}
