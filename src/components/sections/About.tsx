'use client';

import { BadgeCheck, Brush, Droplets, Flame, Quote, Ruler, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY } from '@/lib/site';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { scrollToSection } from '@/lib/utils';

const HIGHLIGHT_ICONS = [BadgeCheck, Ruler, Sparkles, ShieldCheck];
const MINI_SERVICES = [
  { Icon: Flame, label: 'Gás' },
  { Icon: Droplets, label: 'Água' },
  { Icon: Wrench, label: 'Esgoto' },
  { Icon: Brush, label: 'Pintura' },
];

export function About() {
  const { t } = useI18n();

  return (
    <Section id="sobre" className="bg-white" labelledBy="sobre-title">
      <Container size="wide">
        <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Painel visual */}
          <Reveal className="lg:col-span-5" variants={{
            hidden: { opacity: 0, x: -28 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}>
            <div className="relative">
              {/* Cartão escuro com a marca */}
              <div className="relative overflow-hidden rounded-4xl bg-gradient-to-b from-graphite-900 to-graphite-950 p-8 shadow-lift">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(223,174,51,0.18),transparent_65%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
                />
                <div className="relative flex flex-col items-center text-center">
                  <Logo variant="emblem" height={150} />
                  <p className="mt-6 font-display text-xl font-semibold text-white">
                    {COMPANY.legalName}
                  </p>
                  <p className="mt-2 text-2xs font-semibold uppercase tracking-[0.24em] text-gold-300">
                    {COMPANY.tagline}
                  </p>
                </div>

                <ul className="relative mt-8 grid grid-cols-4 gap-2">
                  {MINI_SERVICES.map(({ Icon, label }) => (
                    <li
                      key={label}
                      className="flex flex-col items-center gap-2 rounded-2xl bg-white/[0.05] py-3 ring-1 ring-white/10"
                    >
                      <Icon className="h-4.5 w-4.5 text-gold-300" aria-hidden="true" />
                      <span className="text-2xs font-medium uppercase tracking-wider text-graphite-300">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selo de anos */}
              <div className="absolute -bottom-6 -right-3 flex items-center gap-3 rounded-3xl border border-graphite-200/80 bg-white px-5 py-4 shadow-lift sm:-right-6">
                <span className="font-display text-4xl font-semibold leading-none text-gold-500">
                  {t.about.badgeYears}
                </span>
                <span className="text-xs font-medium leading-tight text-graphite-600">
                  {t.about.badgeYearsLabel}
                </span>
              </div>
            </div>

            {/* Assinatura da marca (o texto de apresentação fica na coluna da direita) */}
            <div className="mt-14 rounded-3xl border border-graphite-200/70 bg-graphite-50/70 p-6">
              <Quote className="h-5 w-5 text-gold-500" aria-hidden="true" />
              <p className="mt-4 font-display text-[1.05rem] italic leading-relaxed text-graphite-700">
                “{COMPANY.tagline}”
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-graphite-500">
                {t.about.signature}
              </p>
            </div>
          </Reveal>

          {/* Conteúdo */}
          <Reveal className="lg:col-span-7" delay={0.05}>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={t.about.title}
              align="left"
              className="max-w-2xl"
            />
            <p className="mt-7 text-lg leading-relaxed text-graphite-700">{t.about.lead}</p>
            <div className="mt-5 grid gap-5">
              {t.about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-graphite-600">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Destaques em grid simétrico */}
            <RevealGroup className="mt-10 grid gap-4 sm:grid-cols-2" staggerChildren={0.08}>
              {t.about.highlights.map((highlight, index) => {
                const Icon = HIGHLIGHT_ICONS[index % HIGHLIGHT_ICONS.length];
                return (
                  <RevealItem
                    key={highlight.title}
                    className="group flex gap-4 rounded-3xl border border-graphite-200/70 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-card"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-gold-200/70 transition-colors duration-300 group-hover:bg-gold-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-graphite-950">
                        {highlight.title}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-graphite-500">
                        {highlight.text}
                      </span>
                    </span>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                onClick={() => scrollToSection('servicos')}
                iconLeft={<Wrench className="h-4 w-4" />}
              >
                {t.nav.servicos}
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('equipa')}>
                {t.nav.equipa}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
