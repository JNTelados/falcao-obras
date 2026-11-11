'use client';

import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock,
} from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import {
  COMPANY,
  SERVICE_IDS,
  SECTION_IDS,
  mailHref,
  mapsHref,
  telHref,
  whatsappHref,
  type SectionId,
} from '@/lib/site';
import { scrollToSection } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'Facebook', href: 'https://facebook.com', Icon: Facebook },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
];

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const navItems: SectionId[] = SECTION_IDS.filter((id) => id !== 'contacto');

  return (
    <footer className="relative overflow-hidden bg-graphite-950 text-graphite-300">
      {/* brilho dourado discreto */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
      />

      <Container size="wide" className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="inline-flex items-center rounded-2xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10">
              <Logo variant="stacked" height={112} />
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-graphite-400">
              {t.footer.about}
            </p>
            <p className="mt-4 font-display text-sm italic text-gold-300">
              â€œ{COMPANY.tagline}â€
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-graphite-300 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400/15 hover:text-gold-300"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* NavegaÃ§Ã£o */}
          <nav aria-label={t.footer.quickLinks} className="lg:col-span-2">
            <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-white">
              {t.footer.quickLinks}
            </h3>
            <ul className="mt-5 grid gap-3 text-sm">
              {navItems.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(id)}
                    className="text-graphite-400 transition-colors duration-200 hover:text-gold-300"
                  >
                    {t.nav[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* ServiÃ§os */}
          <div className="lg:col-span-3">
            <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-white">
              {t.footer.servicesTitle}
            </h3>
            <ul className="mt-5 grid gap-3 text-sm">
              {SERVICE_IDS.slice(0, 6).map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('servicos')}
                    className="text-left text-graphite-400 transition-colors duration-200 hover:text-gold-300"
                  >
                    {t.services.items[id].title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="lg:col-span-3">
            <h3 className="text-2xs font-bold uppercase tracking-[0.2em] text-white">
              {t.footer.contactTitle}
            </h3>
            <ul className="mt-5 grid gap-4 text-sm">
              {COMPANY.phones.map((phone, i) => (
                <li key={phone.raw}>
                  <a
                    href={telHref(i)}
                    className="inline-flex items-start gap-3 text-graphite-300 transition-colors hover:text-gold-300"
                  >
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                    <span className="font-medium">{phone.display}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={mailHref()}
                  className="inline-flex items-start gap-3 text-graphite-400 transition-colors hover:text-gold-300"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-3 text-graphite-400 transition-colors hover:text-gold-300"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  <span>
                    {COMPANY.address.street}
                    <br />
                    {COMPANY.address.postalCode} {COMPANY.address.locality}
                  </span>
                </a>
              </li>
              <li className="inline-flex items-start gap-3 text-graphite-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span>
                  {t.location.weekdays}: 08:00 â€” 19:00
                  <br />
                  {t.location.saturday}: 09:00 â€” 14:00
                </span>
              </li>
            </ul>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1fbe5a]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* RodapÃ© inferior */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <LanguageSwitcher tone="light" />
            <p className="text-xs text-graphite-500">
              Â© {year} {COMPANY.legalName}. {t.footer.rights}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-graphite-500">
            <button type="button" className="transition-colors hover:text-gold-300">
              {t.footer.privacy}
            </button>
            <button type="button" className="transition-colors hover:text-gold-300">
              {t.footer.terms}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('inicio')}
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 font-medium text-graphite-300 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:text-gold-300"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              {t.footer.backToTop}
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-2xs uppercase tracking-[0.2em] text-graphite-600">
          {t.footer.madeWith}
        </p>
      </Container>
    </footer>
  );
}
