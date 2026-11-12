'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, TESTIMONIAL_IDS } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const AVATAR_TONES = [
  'from-gold-300 to-gold-500',
  'from-aqua-400 to-aqua-600',
  'from-ember-400 to-ember-600',
  'from-graphite-500 to-graphite-700',
];

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Testimonials() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIAL_IDS.length;

  const goTo = useCallback((next: number) => setIndex(((next % total) + total) % total), [total]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Avanço automático, pausado no hover/foco e respeitando reduced motion.
  useEffect(() => {
    if (paused || reduce) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % total), 7000);
    return () => window.clearInterval(timer);
  }, [paused, reduce, total]);

  const activeId = TESTIMONIAL_IDS[index];
  const active = t.testimonials.items[activeId];

  return (
    <Section id="depoimentos" className="bg-white" labelledBy="depoimentos-title">
      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          titleId="depoimentos-title"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Resumo de avaliações */}
          <Reveal
            as="aside"
            className="lg:col-span-4"
            variants={{
              hidden: { opacity: 0, x: -24 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <div className="relative h-full overflow-hidden rounded-4xl border border-graphite-200/70 bg-gradient-to-b from-white to-graphite-50 p-8 shadow-soft">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gold-400/12 blur-2xl"
              />
              <div className="relative">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="mt-4 font-display text-5xl font-semibold leading-none text-graphite-950">
                  {COMPANY.stats.rating.toString().replace('.', ',')}
                  <span className="text-2xl text-graphite-400">/5</span>
                </p>
                <p className="mt-2 text-sm text-graphite-500">{t.testimonials.ratingLabel}</p>

                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-graphite-200 pt-7">
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-[0.18em] text-graphite-500">
                      {t.testimonials.reviewsLabel}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl font-semibold text-graphite-950">
                      {COMPANY.stats.reviews}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-2xs font-semibold uppercase tracking-[0.18em] text-graphite-500">
                      {t.hero.stats[1].label}
                    </dt>
                    <dd className="mt-1.5 font-display text-2xl font-semibold text-graphite-950">
                      {COMPANY.stats.projects.toLocaleString('pt-BR')}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>

          {/* Carrossel */}
          <Reveal
            className="lg:col-span-8"
            delay={0.1}
            variants={{
              hidden: { opacity: 0, x: 24 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
            <div
              className="relative overflow-hidden rounded-4xl border border-graphite-200/70 bg-white p-8 shadow-soft sm:p-10"
              role="group"
              aria-roledescription="carrossel"
              aria-label={t.testimonials.title}
            >
              <Quote className="h-8 w-8 text-gold-400/60" aria-hidden="true" />

              <div className="relative mt-6 min-h-[13rem] sm:min-h-[11rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.blockquote
                    key={activeId}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                    animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <p className="font-display text-lg leading-relaxed text-graphite-800 sm:text-xl">
                      “{active.quote}”
                    </p>
                    <footer className="mt-auto flex items-center gap-4 pt-7">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br font-display text-sm font-bold text-white shadow-soft',
                          AVATAR_TONES[index % AVATAR_TONES.length],
                        )}
                      >
                        {initials(active.name)}
                      </span>
                      <span className="flex flex-col">
                        <cite className="text-[0.95rem] font-semibold not-italic text-graphite-950">
                          {active.name}
                        </cite>
                        <span className="text-xs text-graphite-500">{active.role}</span>
                      </span>
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Controles */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-graphite-100 pt-6">
                <div className="flex items-center gap-2.5" role="tablist" aria-label={t.testimonials.title}>
                  {TESTIMONIAL_IDS.map((id, i) => (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`${t.testimonials.goTo} ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={cn(
                        'h-2 rounded-full transition-all duration-300',
                        i === index
                          ? 'w-8 bg-gradient-to-r from-gold-400 to-gold-500'
                          : 'w-2 bg-graphite-200 hover:bg-graphite-300',
                      )}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label={t.testimonials.prev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-graphite-200 bg-white text-graphite-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-600"
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label={t.testimonials.next}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-graphite-200 bg-white text-graphite-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:text-gold-600"
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
