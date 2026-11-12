'use client';

import { Car, Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, mapsEmbedSrc, mapsHref, telHref } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { LinkButton } from '@/components/ui/Button';

export function Location() {
  const { t } = useI18n();

  const fullAddress = `${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.locality}, ${COMPANY.address.region}`;

  return (
    <Section id="localizacao" className="bg-white" labelledBy="localizacao-title">
      <Container size="wide">
        <SectionHeading
          eyebrow={t.location.eyebrow}
          title={t.location.title}
          subtitle={t.location.subtitle}
          titleId="localizacao-title"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Mapa */}
          <Reveal
            className="lg:col-span-7"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <div className="relative h-full overflow-hidden rounded-4xl border border-graphite-200/70 bg-graphite-100 shadow-soft">
              <iframe
                title={t.location.mapTitle}
                src={mapsEmbedSrc()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[22rem] w-full border-0 sm:h-[28rem] lg:h-full lg:min-h-[37rem]"
              />
              {/* Cartão sobreposto com endereço */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                <div className="pointer-events-auto flex flex-col gap-4 rounded-3xl border border-graphite-200/80 bg-white/95 p-5 shadow-lift backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3.5">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-600 ring-1 ring-gold-200/70">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-2xs font-bold uppercase tracking-[0.18em] text-graphite-500">
                        {t.location.addressLabel}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug text-graphite-900">
                        {fullAddress}
                      </p>
                    </div>
                  </div>
                  <LinkButton
                    href={mapsHref()}
                    external
                    variant="primary"
                    size="sm"
                    iconRight={<ExternalLink className="h-4 w-4" />}
                    className="shrink-0"
                  >
                    {t.location.directions}
                  </LinkButton>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Informações */}
          <Reveal
            className="flex flex-col gap-5 lg:col-span-5"
            delay={0.1}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {/* Horários */}
            <div className="rounded-4xl border border-graphite-200/70 bg-white p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-aqua-50 text-aqua-600 ring-1 ring-aqua-200/70">
                  <Clock className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-semibold text-graphite-950">
                  {t.location.hoursLabel}
                </h3>
              </div>
              <dl className="mt-5 grid gap-3 text-sm">
                <div className="flex items-center justify-between gap-4 border-b border-graphite-100 pb-3">
                  <dt className="text-graphite-500">{t.location.weekdays}</dt>
                  <dd className="font-medium text-graphite-900">08:00 — 19:00</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-graphite-100 pb-3">
                  <dt className="text-graphite-500">{t.location.saturday}</dt>
                  <dd className="font-medium text-graphite-900">09:00 — 14:00</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-graphite-500">{t.location.sunday}</dt>
                  <dd className="font-medium text-ember-600">{t.services.items.emergencia.title}</dd>
                </div>
              </dl>
            </div>

            {/* Telefones */}
            <div className="rounded-4xl border border-graphite-200/70 bg-graphite-950 p-7 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-400/12 text-gold-300 ring-1 ring-gold-400/25">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-base font-semibold text-white">
                  {t.location.phoneLabel}
                </h3>
              </div>
              <ul className="mt-5 grid gap-3">
                {COMPANY.phones.map((phone, i) => (
                  <li key={phone.raw}>
                    <a
                      href={telHref(i)}
                      className="group flex items-center justify-between gap-4 rounded-2xl bg-white/[0.05] px-4 py-3.5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400/12 hover:ring-gold-400/25"
                    >
                      <span className="flex flex-col">
                        <span className="font-display text-lg font-semibold text-white">
                          {phone.display}
                        </span>
                        <span className="text-2xs uppercase tracking-[0.16em] text-graphite-400">
                          {phone.label}
                        </span>
                      </span>
                      <Navigation
                        className="h-4 w-4 text-gold-300 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zonas atendidas + taxa de deslocação */}
            <div className="rounded-4xl border border-graphite-200/70 bg-graphite-50 p-7">
              <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-graphite-600">
                {t.location.coverageLabel}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {t.location.coverage.map((area) => (
                  <li
                    key={area}
                    className="rounded-full border border-graphite-200 bg-white px-3.5 py-1.5 text-xs font-medium text-graphite-700 transition-colors duration-300 hover:border-gold-300 hover:text-gold-700"
                  >
                    {area}
                  </li>
                ))}
              </ul>

              {/* Taxa de deslocação: valores fixos por zona */}
              <div className="mt-6 border-t border-graphite-200 pt-5">
                <h4 className="inline-flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.2em] text-graphite-600">
                  <Car className="h-3.5 w-3.5 text-gold-500" aria-hidden="true" />
                  {t.location.travelTitle}
                </h4>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {t.location.travelFees.map((item) => (
                    <li
                      key={item.region}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-graphite-200 bg-white px-4 py-3"
                    >
                      <span className="text-xs font-medium text-graphite-700">{item.region}</span>
                      <span className="font-display text-base font-semibold text-gold-600">
                        {item.fee}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-graphite-500">
                  {t.location.travelNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
