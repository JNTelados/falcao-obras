'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Mail, MapPin, Menu, Phone, X, Clock, ArrowRight } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { COMPANY, SECTION_IDS, telHref, mapsHref, mailHref, whatsappHref, type SectionId } from '@/lib/site';
import { cn, scrollToSection } from '@/lib/utils';
import { EASE } from '@/lib/motion';
import { Container } from '@/components/ui/Container';
import { Button, LinkButton } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { Logo } from '@/components/ui/Logo';

const NAV_ORDER: SectionId[] = [
  'inicio',
  'sobre',
  'servicos',
  'diferenciais',
  'depoimentos',
  'equipa',
  'localizacao',
  'faq',
  'contacto',
];

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>('inicio');
  const reduce = useReducedMotion();

  // Sombra/elevação do cabeçalho conforme o scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Destaca o link da secção visível.
  useEffect(() => {
    const sections = NAV_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id as SectionId);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Bloqueia o scroll com o menu mobile aberto + fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Aguarda o fecho do menu para medir o scroll corretamente.
    window.setTimeout(() => scrollToSection(id), open ? 180 : 0);
  };

  const navItems = NAV_ORDER.filter((id) => id !== 'inicio');

  return (
    <header data-site-header className="fixed inset-x-0 top-0 z-50">
      {/* Barra superior: contatos + idioma (canto superior esquerdo) */}
      <div className="hidden bg-graphite-950 text-graphite-300 lg:block">
        <Container size="wide">
          <div className="flex h-10 items-center justify-between gap-6 text-xs">
            <div className="flex items-center gap-5">
              <LanguageSwitcher tone="light" />
              <span className="h-4 w-px bg-white/15" aria-hidden="true" />
              <a
                href={telHref(0)}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {COMPANY.phones[0].display}
              </a>
              <a
                href={telHref(1)}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {COMPANY.phones[1].display}
              </a>
              <a
                href={mailHref()}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </div>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                {t.location.weekdays} · 08:00 — 19:00
              </span>
              <a
                href={mapsHref()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
              >
                <MapPin className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                {COMPANY.address.locality}, {COMPANY.address.region}
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Navegação principal — superfície suave, sem blur pesado (custo de pintura) */}
      <div
        className={cn(
          'border-b transition-colors duration-300',
          scrolled
            ? 'border-graphite-200/70 bg-canvas/95 shadow-soft backdrop-blur-[2px]'
            : 'border-transparent bg-canvas',
        )}
      >
        <Container size="wide">
          <div
            className={cn(
              'flex items-center justify-between gap-4 transition-all duration-300',
              scrolled ? 'h-16' : 'h-18',
            )}
          >
            {/* Logo: chip claro com filete dourado — a marca respira sem pesar */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                go('inicio');
              }}
              className="group flex shrink-0 items-center gap-3"
              aria-label={`${COMPANY.legalName} — ${t.nav.inicio}`}
            >
              <span className="relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-graphite-600 to-graphite-700 px-3 py-2 ring-1 ring-gold-300/45 shadow-soft transition-all duration-300 group-hover:from-graphite-500 group-hover:to-graphite-600 group-hover:ring-gold-400/70">
                <Logo variant="lockup" height={34} priority />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 bottom-1 h-px rounded-full bg-gradient-to-r from-transparent via-gold-300/75 to-transparent"
                />
              </span>
              <span className="sr-only">{COMPANY.legalName}</span>
            </a>

            <nav aria-label={t.nav.menu} className="hidden items-center gap-0.5 xl:flex">
              {navItems.map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => go(id)}
                  aria-current={active === id ? 'true' : undefined}
                  className={cn(
                    'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200',
                    active === id
                      ? 'text-graphite-950'
                      : 'text-graphite-600 hover:text-graphite-950',
                  )}
                >
                  {t.nav[id]}
                  {active === id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  ) : null}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <LanguageSwitcher className="lg:hidden" tone="solid" />              <LinkButton
                href={whatsappHref()}
                external
                variant="whatsapp"
                size="sm"
                className="hidden sm:inline-flex"
                iconLeft={<Phone className="h-4 w-4" />}
              >
                {t.hero.ctaSecondary}
              </LinkButton>
              <Button
                variant="secondary"
                size="sm"
                className="hidden lg:inline-flex"
                onClick={() => go('contacto')}
                iconRight={<ArrowRight className="h-4 w-4" />}
              >
                {t.nav.orcamento}
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-mobile"
                aria-label={open ? t.nav.close : t.nav.openMenu}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-graphite-950 text-white ring-1 ring-white/10 transition-colors hover:bg-graphite-800 xl:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-mobile"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-graphite-200 bg-white shadow-lift xl:hidden"
          >
            <Container size="wide" className="py-5">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="inline-flex items-center rounded-xl bg-gradient-to-b from-graphite-600 to-graphite-700 px-3 py-2 ring-1 ring-gold-300/45">
                  <Logo variant="lockup" height={26} />
                </span>
                <LanguageSwitcher tone="solid" />
              </div>
              <nav aria-label={t.nav.menu} className="grid gap-1">
                {NAV_ORDER.map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => go(id)}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-left text-[0.95rem] font-medium transition-colors',
                      active === id
                        ? 'bg-graphite-950 text-white'
                        : 'text-graphite-700 hover:bg-graphite-100',
                    )}
                  >
                    {t.nav[id]}
                    <ArrowRight className="h-4 w-4 opacity-60" aria-hidden="true" />
                  </button>
                ))}
              </nav>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                <LinkButton
                  href={whatsappHref()}
                  external
                  variant="whatsapp"
                  fullWidth
                  iconLeft={<Phone className="h-4 w-4" />}
                >
                  {t.hero.ctaSecondary}
                </LinkButton>
                <Button variant="secondary" fullWidth onClick={() => go('contacto')}>
                  {t.hero.ctaPrimary}
                </Button>
              </div>
              <div className="mt-5 grid gap-2 border-t border-graphite-200 pt-5 text-sm text-graphite-600">
                {COMPANY.phones.map((phone, i) => (
                  <a key={phone.raw} href={telHref(i)} className="inline-flex items-center gap-2 hover:text-graphite-950">
                    <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" />
                    {phone.display}
                  </a>
                ))}
                <a href={mailHref()} className="inline-flex items-center gap-2 hover:text-graphite-950">
                  <Mail className="h-4 w-4 text-gold-500" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
