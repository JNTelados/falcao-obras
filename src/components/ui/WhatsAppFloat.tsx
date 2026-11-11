'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, whatsappHref } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { cn } from '@/lib/utils';

/** Ícone oficial do WhatsApp (lucide não inclui a marca). */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.014-.52-.072-.148-.66-1.59-.905-2.178-.24-.578-.482-.5-.66-.51-.172-.008-.371-.01-.57-.01a1.1 1.1 0 0 0-.793.371c-.273.298-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Botão fixo de WhatsApp com tooltip, anel pulsante e balão proativo.
 */
export function WhatsAppFloat() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [showBubble, setShowBubble] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Balão proativo após 9s de navegação, uma única vez por sessão.
  useEffect(() => {
    if (dismissed) return;
    try {
      if (window.sessionStorage.getItem('falcao.wa.bubble') === '1') return;
    } catch {
      /* storage indisponível: segue com o balão */
    }
    const timer = window.setTimeout(() => setShowBubble(true), 9000);
    return () => window.clearTimeout(timer);
  }, [dismissed]);

  const closeBubble = () => {
    setShowBubble(false);
    setDismissed(true);
    try {
      window.sessionStorage.setItem('falcao.wa.bubble', '1');
    } catch {
      /* ignora */
    }
  };

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-7 sm:right-6">
      <AnimatePresence>
        {showBubble ? (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.96 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative max-w-[16rem] rounded-2xl rounded-br-md border border-graphite-200/80 bg-white p-4 pr-9 shadow-lift"
            role="status"
          >
            <button
              type="button"
              onClick={closeBubble}
              aria-label={t.nav.close}
              className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-graphite-400 transition-colors hover:bg-graphite-100 hover:text-graphite-700"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <p className="text-sm font-semibold text-graphite-950">{t.whatsappFloat.tooltip}</p>
            <p className="mt-1 text-xs leading-relaxed text-graphite-500">
              {COMPANY.phones[0].display} · {COMPANY.phones[1].display}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappFloat.label}
        onMouseEnter={() => !dismissed && setShowBubble(true)}
        whileHover={reduce ? undefined : { scale: 1.06 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift ring-4 ring-white/70 sm:h-16 sm:w-16"
      >
        {!reduce ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]/50"
          />
        ) : null}
        <WhatsAppGlyph className="relative h-7 w-7" />
        <span className="sr-only">{t.whatsappFloat.label}</span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-graphite-950 px-3.5 py-2 text-xs font-medium text-white opacity-0 shadow-card transition-opacity duration-300 group-hover:opacity-100 lg:block"
        >
          {t.whatsappFloat.label}
        </span>
      </motion.a>

      {/* Atalho de chamada em ecrãs pequenos */}
      <a
        href={`tel:+${COMPANY.phones[0].raw}`}
        aria-label={`${t.contact.callNow} ${COMPANY.phones[0].display}`}
        className={cn(
          'inline-flex h-11 w-11 items-center justify-center rounded-full bg-graphite-950 text-white shadow-card ring-4 ring-white/70 transition-transform duration-300 hover:scale-105 sm:hidden',
        )}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}

export { WhatsAppGlyph };
