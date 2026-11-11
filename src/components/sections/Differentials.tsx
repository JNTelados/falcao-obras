'use client';

import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { DIFFERENTIAL_IDS, whatsappHref } from '@/lib/site';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { DIFFERENTIAL_ICONS, PROCESS_ICONS } from '@/components/ui/icons';
import { Button, LinkButton } from '@/components/ui/Button';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';
import { scrollToSection } from '@/lib/utils';

export function Differentials() {
  const { t } = useI18n();

  return (
    <Section
      id="diferenciais"
      className="overflow-hidden bg-graphite-950"
      labelledBy="diferenciais-title"
    >
      {/* Fundo decorativo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_15%_0%,rgba(37,154,166,0.16),transparent_60%),radial-gradient(55%_45%_at_85%_10%,rgba(223,174,51,0.14),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />

      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow={t.differentials.eyebrow}
          title={t.differentials.title}
          subtitle={t.differentials.subtitle}
          tone="light"
          titleId="diferenciais-title"
        />

        {/* Grid simétrico de 6 diferenciais */}
        <RevealGroup
          as="ul"
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerChildren={0.08}
        >
          {DIFFERENTIAL_IDS.map((id, index) => {
            const item = t.differentials.items[id];
            const Icon = DIFFERENTIAL_ICONS[id];
            return (
              <RevealItem
                as="li"
                key={id}
                className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-400/30 hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400/12 text-gold-300 ring-1 ring-gold-400/25 transition-colors duration-300 group-hover:bg-gold-400/20">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-2xs font-bold uppercase tracking-[0.2em] text-graphite-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-400">{item.text}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Processo em 4 passos */}
        <div className="mt-20">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.24em] text-gold-300">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-300" aria-hidden="true" />
                {t.process.eyebrow}
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white sm:text-3xl">
                {t.process.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite-400">{t.process.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => scrollToSection('contacto')}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                {t.hero.ctaPrimary}
              </Button>
              <LinkButton
                href={whatsappHref()}
                external
                variant="outlineLight"
                iconLeft={<WhatsAppGlyph className="h-4.5 w-4.5" />}
              >
                {t.hero.ctaSecondary}
              </LinkButton>
            </div>
          </div>

          <RevealGroup as="ol" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerChildren={0.08}>
            {t.process.steps.map((step, index) => {
              const Icon = PROCESS_ICONS[index % PROCESS_ICONS.length];
              return (
                <RevealItem
                  as="li"
                  key={step.title}
                  className="relative flex h-full flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-transparent p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-graphite-900 text-gold-300 ring-1 ring-white/10">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="mt-5 font-display text-3xl font-semibold leading-none text-white/12">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-3 text-[0.95rem] font-semibold text-white">{step.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-graphite-400">{step.text}</p>
                  {index < t.process.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute -right-2.5 top-1/2 hidden h-px w-5 bg-gradient-to-r from-gold-400/60 to-transparent lg:block"
                    />
                  ) : null}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </Section>
  );
}
