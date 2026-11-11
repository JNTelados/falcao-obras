'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  DEFAULT_LOCALE,
  LOCALES,
  dictionaries,
  type Dictionary,
  type Locale,
} from './dictionaries';

const STORAGE_KEY = 'falcao.locale';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
  /** Utilitário simples para listas localizadas (ex.: zonas atendidas). */
  isDefault: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Restaura a preferência guardada (evita hydration mismatch: só após montar).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && LOCALES.some((l) => l.code === stored)) {
        setLocaleState(stored);
        return;
      }
      const browser = window.navigator.language?.toLowerCase() ?? '';
      if (browser.startsWith('en')) setLocaleState('en');
    } catch {
      /* modo privado / storage indisponível: mantém o padrão */
    }
  }, []);

  // Mantém <html lang> coerente para leitores de tela e SEO.
  useEffect(() => {
    const entry = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
    document.documentElement.lang = entry.htmlLang;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignora falha de storage */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === 'pt' ? 'en' : 'pt'),
      t: dictionaries[locale],
      isDefault: locale === DEFAULT_LOCALE,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n deve ser usado dentro de <I18nProvider>.');
  return ctx;
}
