'use client';

import { Clock, MapPin, Phone, ShieldCheck, Timer } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, telHref, whatsappHref } from '@/lib/site';
import { EASE } from '@/lib/motion';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ContactForm } from './ContactForm';
import { WhatsAppGlyph } from '@/components/ui/WhatsAppFloat';

export function Contact() {
  const { t } = useI18n();

  return (
    <Section id="contacto" className="bg-white" labelledBy="contacto-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(223,174,51,0.08),transparent_70%)]"
      />
      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow={t.contact.eyebrow}
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          titleId="contacto-title"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Formulário */}
          <Reveal
            className="lg:col-span-7"
            variants={{
              hidden: { opacity: 0, y: 26 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            <ContactForm />
          </Reveal>

          {/* Informações de contato */}
          <Reveal
            className="flex flex-col gap-5 lg:col-span-5"
            delay={0.1}
            variants={{
              hidden: { opacity: 0, y: 26 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
          >
            {/* Bloco escuro com os telefones — destaque principal */}
            <div className="relative overflow-hidden rounded-4xl bg-graphite-950 p-7 shadow-lift">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold-500/15 blur-2xl"
              />
              <div className="relative">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] text-gold-300 ring-1 ring-white/10">
                  <Phone className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">
                  {t.contact.infoTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-graphite-400">{t.contact.infoText}</p>

                <ul className="mt-6 grid gap-3">
                  {COMPANY.phones.map((phone, i) => (
                    <li key={phone.raw}>
                      <a
                        href={telHref(i)}
                        className="group flex items-center justify-between gap-4 rounded-2xl bg-white/[0.05] px-5 py-4 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400/12 hover:ring-gold-400/25"
                      >
                        <span className="flex flex-col">
                          <span className="font-display text-xl font-semibold tracking-tight text-white">
                            {phone.display}
                          </span>
                          <span className="text-2xs uppercase tracking-[0.16em] text-graphite-400">
                            {phone.label}
                          </span>
                        </span>
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-gold-300 transition-colors duration-300 group-hover:bg-gold-400/20">
                          <Phone className="h-4.5 w-4.5" aria-hidden="true" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex items-center gap-4 rounded-2xl bg-[#25D366] px-5 py-4 text-white shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fbe5a]"
                >
                  <WhatsAppGlyph className="h-7 w-7 shrink-0" />
                  <span className="flex flex-col">
                    <span className="text-[0.95rem] font-semibold">{t.contact.whatsappTitle}</span>
                    <span className="text-xs text-white/85">{t.contact.whatsappText}</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Cartões auxiliares */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-graphite-200/70 bg-white p-5 shadow-soft">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600 ring-1 ring-gold-200/70">
                  <Timer className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-semibold text-graphite-950">
                  {t.contact.responseTime}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-graphite-500">{t.location.weekdays} · 08:00 — 19:00</p>
              </div>

              <div className="rounded-3xl border border-graphite-200/70 bg-white p-5 shadow-soft">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-50 text-aqua-600 ring-1 ring-aqua-200/70">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-semibold text-graphite-950">
                  {t.differentials.items.garantia.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-graphite-500">
                  {t.differentials.items.garantia.text}
                </p>
              </div>

              <div className="rounded-3xl border border-graphite-200/70 bg-graphite-50 p-5 sm:col-span-2">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-gold-600 ring-1 ring-graphite-200">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-2xs font-bold uppercase tracking-[0.16em] text-graphite-500">
                      {t.location.addressLabel}
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-graphite-800">
                      {COMPANY.address.street}
                      <br />
                      {COMPANY.address.postalCode} {COMPANY.address.locality}, {COMPANY.address.region}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-graphite-200/70 bg-white px-5 py-4 shadow-soft sm:col-span-2">
                <Clock className="h-4.5 w-4.5 shrink-0 text-gold-500" aria-hidden="true" />
                <p className="text-xs leading-relaxed text-graphite-600">
                  {t.location.weekdays}: 08:00 — 19:00 · {t.location.saturday}: 09:00 — 14:00 ·{' '}
                  {t.location.sunday}: {t.services.items.emergencia.title}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
