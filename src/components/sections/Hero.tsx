'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Brush,
  Droplets,
  Flame,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, whatsappHref } from '@/lib/site';
import { EASE, viewportOnce } from '@/lib/motion';
import { Container } from '@/components/ui/Container';
import { Button, LinkButton } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';

const SERVICE_CHIPS = [
  { Icon: Flame, key: 'gas', tone: 'text-flame-300 bg-flame-400/10 ring-flame-400/20' },
  { Icon: Droplets, key: 'aguas', tone: 'text-aqua-300 bg-aqua-400/10 ring-aqua-400/20' },
  { Icon: Wrench, key: 'esgotos', tone: 'text-gold-300 bg-gold-400/10 ring-gold-400/20' },
  { Icon: Brush, key: 'pintura', tone: 'text-ember-300 bg-ember-400/10 ring-ember-400/20' },
] as const;

export function Hero() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const stats = t.hero.stats;
  const [entered, setEntered] = useState(false);

  /**
   * Entrada do hero: o HTML já vem visível (nada de opacity:0 no SSR) e o JS
   * apenas acrescenta o movimento depois da montagem. Assim o conteúdo crítico
   * nunca fica em branco — nem sem JavaScript, nem em capturas/impressões.
   */
  useEffect(() => {
    if (reduce) return;
    const raf = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(raf);
  }, [reduce]);

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };
  /** Variante exclusiva da coluna visual (entra um pouco depois). */
  const visual: Variants = {
    hidden: { opacity: 0, y: 34 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE, delay: 0.16 } },
  };

  const anim = entered
    ? { initial: 'hidden' as const, animate: 'visible' as const }
    : { initial: false as const, animate: 'visible' as const };

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-graphite-950 pb-18 pt-30 sm:pb-22 sm:pt-36 lg:pb-30 lg:pt-44"
    >
      {/* Fundo: grade técnica + brilhos de cor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:56px_56px]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(223,174,51,0.16),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-32 top-1/3 -z-10 h-80 w-80 rounded-full bg-aqua-500/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-16 -z-10 h-72 w-72 rounded-full bg-ember-500/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />

      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Coluna de texto */}
          <motion.div
            variants={container}
            {...anim}
            className="lg:col-span-6 xl:col-span-6"
          >
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2 text-xs font-medium text-graphite-200 ring-1 ring-white/12 backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
                </span>
                {t.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={item}
              className="mt-7 font-display text-[2.1rem] font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.35rem]"
            >
              {t.hero.title}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-gold-200 via-gold-400 to-gold-200 bg-clip-text text-transparent">
                  {t.hero.titleHighlight}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-1 -z-0 h-2.5 rounded-full bg-gold-500/20 blur-[6px]"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-xl text-base leading-relaxed text-graphite-300 sm:text-[1.075rem]"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3.5">
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  const el = document.getElementById('contacto');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 96;
                    window.scrollTo({
                      top,
                      behavior: reduce ? 'auto' : 'smooth',
                    });
                  }
                }}
                iconRight={<ArrowRight className="h-4.5 w-4.5" />}
              >
                {t.hero.ctaPrimary}
              </Button>
              <LinkButton
                href={whatsappHref()}
                external
                variant="whatsapp"
                size="lg"
                iconLeft={<WhatsAppGlyph className="h-5 w-5" />}
              >
                {t.hero.ctaSecondary}
              </LinkButton>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-graphite-400"
            >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4.5 w-4.5 text-gold-400" aria-hidden="true" />
                {t.hero.trust}
              </span>
            </motion.div>

            {/* Estatísticas */}
            <motion.dl
              variants={item}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-semibold text-white sm:text-[1.75rem]">
                    {stat.value}
                  </dd>
                  <dd className="text-xs leading-snug text-graphite-400">{stat.label}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Coluna visual */}
          <motion.div
            variants={visual}
            {...anim}
            className="lg:col-span-6 xl:col-span-6"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Cartão principal */}
              <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-7 shadow-lift backdrop-blur-xl sm:p-9">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/15 blur-2xl"
                />
                <div className="relative flex items-center justify-center">
                  <Logo variant="emblem" height={132} priority className="opacity-95" />
                </div>
                <div className="relative mt-6 text-center">
                  <p className="font-display text-lg font-semibold text-white">{t.hero.cardTitle}</p>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-graphite-300">
                    {t.hero.cardText}
                  </p>
                </div>

                {/* Chips de serviços */}
                <ul className="relative mt-8 grid gap-2.5 sm:grid-cols-2">
                  {SERVICE_CHIPS.map(({ Icon, key, tone }) => (
                    <li
                      key={key}
                      className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-3 text-xs font-medium ring-1 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 ${tone}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-graphite-100">{t.services.items[key].title}</span>
                    </li>
                  ))}
                </ul>

                {/* Prova social dentro do cartão (sempre visível, sem sobreposição) */}
                <div className="relative mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-6">
                  <span className="flex items-center gap-1" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </span>
                  <span className="text-sm text-graphite-300">
                    <strong className="font-display text-base font-semibold text-white">
                      {COMPANY.stats.rating.toString().replace('.', ',')}/5
                    </strong>{' '}
                    · {COMPANY.stats.reviews} {t.testimonials.reviewsLabel}
                  </span>
                </div>
              </div>

              {/* Cartão flutuante: garantia — animação pausa fora do ecrã */}
              <motion.div
                animate={reduce ? undefined : { y: [0, 9, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="absolute -right-2 top-10 hidden items-center gap-3 rounded-2xl border border-graphite-200/80 bg-white/95 px-4 py-3 shadow-card lg:flex"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-600 ring-1 ring-gold-200/70">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold leading-tight text-graphite-900">
                  {t.differentials.items.garantia.title}
                  <span className="mt-0.5 flex items-center gap-1 font-medium text-graphite-500">
                    <Sparkles className="h-3 w-3 text-gold-500" aria-hidden="true" />
                    {COMPANY.founded} → {new Date().getFullYear()}
                  </span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-16 hidden justify-center lg:flex"
      >
        <a
          href="#sobre"
          className="group inline-flex flex-col items-center gap-2 text-2xs font-medium uppercase tracking-[0.22em] text-graphite-500 transition-colors hover:text-gold-300"
        >
          {t.hero.scroll}
          <span className="relative h-9 w-5 rounded-full border border-white/20">
            <motion.span
              animate={reduce ? undefined : { y: [3, 14, 3], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-400"
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
