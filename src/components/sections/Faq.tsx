'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { HelpCircle, Minus, Plus, MessageSquare } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { FAQ_IDS, whatsappHref } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';
import { cn } from '@/lib/utils';

export function Faq() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<string | null>(FAQ_IDS[0]);

  return (
    <Section id="faq" className="bg-graphite-50" labelledBy="faq-title">
      <div aria-hidden="true" className="bg-technical-grid" />
      <Container size="wide" className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Coluna de apoio */}
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={t.faq.eyebrow}
              title={t.faq.title}
              subtitle={t.faq.subtitle}
              align="left"
              titleId="faq-title"
              className="max-w-md"
            />
            <div className="mt-8 rounded-4xl border border-graphite-200/70 bg-white p-6 shadow-soft">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-gold-200/70">
                <HelpCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 font-display text-base font-semibold text-graphite-950">
                {t.faq.stillDoubts}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-graphite-500">{t.contact.infoText}</p>
              <LinkButton
                href={whatsappHref()}
                external
                variant="whatsapp"
                fullWidth
                className="mt-5"
                iconLeft={<WhatsAppGlyph className="h-4.5 w-4.5" />}
              >
                {t.faq.talkNow}
              </LinkButton>
            </div>
          </div>

          {/* Acordeão */}
          <div className="lg:col-span-8">
            <RevealGroup as="ul" className="grid gap-3" staggerChildren={0.05}>
              {FAQ_IDS.map((id, index) => {
                const faq = t.faq.items[id];
                const isOpen = open === id;
                return (
                  <RevealItem
                    as="li"
                    key={id}
                    className={cn(
                      'overflow-hidden rounded-3xl border bg-white transition-colors duration-300',
                      isOpen
                        ? 'border-gold-200 shadow-card'
                        : 'border-graphite-200/70 shadow-soft hover:border-graphite-300/80',
                    )}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${id}`}
                        id={`faq-trigger-${id}`}
                        className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                      >
                        <span className="flex items-start gap-4">
                          <span
                            className={cn(
                              'mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-2xs font-bold transition-colors duration-300',
                              isOpen
                                ? 'bg-gold-400 text-graphite-950'
                                : 'bg-graphite-100 text-graphite-500',
                            )}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            className={cn(
                              'font-display text-[1.02rem] font-semibold leading-snug transition-colors duration-300',
                              isOpen ? 'text-graphite-950' : 'text-graphite-800',
                            )}
                          >
                            {faq.question}
                          </span>
                        </span>
                        <span
                          className={cn(
                            'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300',
                            isOpen
                              ? 'border-gold-300 bg-gold-50 text-gold-600'
                              : 'border-graphite-200 text-graphite-500',
                          )}
                          aria-hidden="true"
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="panel"
                          id={`faq-panel-${id}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${id}`}
                          initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.34, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 pl-[4.25rem] text-sm leading-relaxed text-graphite-600">
                            {faq.answer}
                          </p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <p className="mt-6 inline-flex items-center gap-2 text-xs text-graphite-500">
              <MessageSquare className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
              {t.contact.form.consent}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
