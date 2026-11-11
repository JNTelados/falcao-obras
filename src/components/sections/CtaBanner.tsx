'use client';

import { ArrowRight, BadgeCheck, Phone } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, telHref, whatsappHref } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { Container } from '@/components/ui/Container';
import { Button, LinkButton } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';
import { scrollToSection } from '@/lib/utils';

/** Faixa de conversão final, antes do rodapé. */
export function CtaBanner() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="cta-title" className="relative bg-white pb-18 sm:pb-22 lg:pb-30">
      <Container size="wide">
        <Reveal
          variants={{
            hidden: { opacity: 0, y: 28 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
          }}
          className="relative isolate overflow-hidden rounded-5xl bg-graphite-950 px-7 py-12 shadow-lift sm:px-12 sm:py-16 lg:px-16"
        >
          {/* Fundo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(70%_120%_at_12%_0%,rgba(223,174,51,0.2),transparent_60%),radial-gradient(60%_120%_at_88%_100%,rgba(37,154,166,0.16),transparent_60%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white/[0.06] px-4 py-2 text-2xs font-semibold uppercase tracking-[0.18em] text-gold-300 ring-1 ring-white/12">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                {t.differentials.items.orcamento.title}
              </span>
              <h2
                id="cta-title"
                className="mt-6 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl"
              >
                {t.cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-graphite-300">
                {t.cta.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => scrollToSection('contacto')}
                  iconRight={<ArrowRight className="h-4.5 w-4.5" />}
                >
                  {t.cta.primary}
                </Button>
                <LinkButton
                  href={whatsappHref()}
                  external
                  variant="whatsapp"
                  size="lg"
                  iconLeft={<WhatsAppGlyph className="h-5 w-5" />}
                >
                  {t.cta.secondary}
                </LinkButton>
                <a
                  href={telHref(0)}
                  className="inline-flex items-center gap-2.5 rounded-full px-2 py-2 text-sm font-medium text-graphite-300 transition-colors hover:text-gold-300"
                >
                  <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
                  {COMPANY.phones[0].display}
                </a>
              </div>
            </div>

            {/* Selo da marca */}
            <div className="lg:col-span-5">
              <div className="mx-auto flex max-w-xs flex-col items-center rounded-4xl border border-white/10 bg-white/[0.04] p-7 text-center backdrop-blur-sm lg:ml-auto lg:mr-0">
                <Logo variant="emblem" height={120} />
                <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
                  {COMPANY.name}
                </p>
                <p className="mt-2 text-2xs font-medium uppercase tracking-[0.18em] text-gold-300">
                  {COMPANY.tagline}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
