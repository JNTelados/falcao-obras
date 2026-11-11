'use client';

import { ArrowRight, Check, PhoneCall } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { SERVICE_IDS, whatsappHref, type ServiceId } from '@/lib/site';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { IconBadge } from '@/components/ui/Card';
import { Button, LinkButton } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SERVICE_ICONS } from '@/components/ui/icons';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';
import { scrollToSection } from '@/lib/utils';

/** Destaques visuais por serviço (barra superior do card). */
const ACCENTS: Record<ServiceId, string> = {
  gas: 'from-flame-400 to-flame-600',
  aguas: 'from-aqua-400 to-aqua-600',
  remodelacao: 'from-gold-300 to-gold-500',
  pintura: 'from-ember-400 to-ember-600',
  esgotos: 'from-aqua-300 to-aqua-500',
  manutencao: 'from-graphite-400 to-graphite-600',
  emergencia: 'from-ember-500 to-ember-700',
  avaliacao: 'from-gold-400 to-gold-600',
};

export function Services() {
  const { t } = useI18n();

  return (
    <Section id="servicos" className="bg-graphite-50" labelledBy="servicos-title">
      <div aria-hidden="true" className="bg-technical-grid" />
      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
          titleId="servicos-title"
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerChildren={0.06}
        >
          {SERVICE_IDS.map((id, index) => {
            const service = t.services.items[id];
            const { Icon, tone } = SERVICE_ICONS[id];
            return (
              <RevealItem
                as="li"
                key={id}
                distance={24}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-graphite-200/70 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-graphite-300/70 hover:shadow-lift"
              >
                {/* Barra de acento */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${ACCENTS[id]} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <IconBadge tone={tone} size="lg" className="mt-1">
                  <Icon />
                </IconBadge>

                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-graphite-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite-500">{service.summary}</p>

                <ul className="mt-5 grid gap-2.5 border-t border-graphite-100 pt-5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-[0.82rem] leading-snug text-graphite-600">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Ação revelada no hover */}
                <div className="mt-6 flex-1" />
                <button
                  type="button"
                  onClick={() => scrollToSection('contacto')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-graphite-700 transition-colors duration-300 group-hover:text-gold-600"
                >
                  {t.services.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Faixa de apoio */}
        <Reveal
          delay={0.05}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-4xl border border-graphite-200/70 bg-white p-7 shadow-soft lg:flex-row lg:p-8"
        >
          <div className="flex items-start gap-4">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ember-50 text-ember-600 ring-1 ring-ember-200/70">
              <PhoneCall className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-graphite-950">
                {t.services.items.emergencia.title}
              </p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-graphite-500">
                {t.services.items.emergencia.summary}
              </p>
            </div>
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <LinkButton
              href={whatsappHref()}
              external
              variant="whatsapp"
              iconLeft={<WhatsAppGlyph className="h-4.5 w-4.5" />}
            >
              {t.hero.ctaSecondary}
            </LinkButton>
            <Button variant="ghost" onClick={() => scrollToSection('contacto')}>
              {t.services.all}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
