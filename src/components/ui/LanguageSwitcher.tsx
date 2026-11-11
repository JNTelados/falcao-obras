'use client';

import { useI18n } from '@/i18n/I18nProvider';
import { LOCALES } from '@/i18n/dictionaries';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/dictionaries';

interface LanguageSwitcherProps {
  className?: string;
  /** `solid` = botão em pílula; `minimal` = apenas texto. */
  tone?: 'solid' | 'minimal' | 'light';
  align?: 'left' | 'right';
}

/**
 * Alternador de idioma (PT-BR ↔ EN) fixo no canto superior esquerdo do site.
 * A preferência é persistida em localStorage pelo I18nProvider.
 */
export function LanguageSwitcher({ className, tone = 'solid' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  const toneStyles = {
    solid: 'bg-white/95 ring-graphite-200/80 shadow-soft',
    light: 'bg-white/10 ring-white/20 backdrop-blur-sm',
    minimal: 'bg-transparent ring-transparent',
  } as const;

  const activeStyles = {
    solid: 'bg-graphite-950 text-white shadow-soft',
    light: 'bg-white text-graphite-950',
    minimal: 'bg-gold-400/20 text-gold-200',
  } as const;

  const idleStyles = {
    solid: 'text-graphite-500 hover:text-graphite-900',
    light: 'text-graphite-300 hover:text-white',
    minimal: 'text-graphite-400 hover:text-gold-200',
  } as const;

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full p-0.5 ring-1',
        toneStyles[tone],
        className,
      )}
    >
      <span className="sr-only">{t.nav.language}</span>
      {LOCALES.map((entry) => {
        const active = entry.code === locale;
        return (
          <button
            key={entry.code}
            type="button"
            onClick={() => setLocale(entry.code as Locale)}
            aria-pressed={active}
            title={active ? entry.label : `Switch to ${entry.label}`}
            className={cn(
              'relative inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-bold tracking-wide transition-all duration-300',
              active ? activeStyles[tone] : idleStyles[tone],
            )}
          >
            <span aria-hidden="true" className="text-[0.8rem] leading-none">
              {entry.flag}
            </span>
            {/* Em ecrãs muito estreitos fica só a bandeira, para o cabeçalho respirar */}
            <span className="hidden min-[400px]:inline">{entry.short}</span>
            <span className="sr-only">
              {active ? `${t.nav.language}: ${entry.label}` : t.nav.switchTo}
            </span>
          </button>
        );
      })}
    </div>
  );
}
