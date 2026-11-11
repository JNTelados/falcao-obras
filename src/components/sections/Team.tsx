'use client';

import { BadgeCheck, Flame, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useI18n } from '@/i18n/I18nProvider';
import { TEAM_IDS, mailHref, telHref, type TeamId } from '@/lib/site';
import { Container, Section } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { TEAM_FALLBACK_ICONS } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

/** Tom do anel/monograma por membro (grid visualmente equilibrado). */
const MEMBER_TONES: Record<TeamId, { ring: string; chip: string; gradient: string }> = {
  olavo: {
    ring: 'ring-gold-200',
    chip: 'bg-gold-50 text-gold-600',
    gradient: 'from-gold-300 via-gold-500 to-gold-700',
  },
  luisa: {
    ring: 'ring-aqua-200',
    chip: 'bg-aqua-50 text-aqua-600',
    gradient: 'from-aqua-300 via-aqua-500 to-aqua-700',
  },
  'olavo-junior': {
    ring: 'ring-graphite-200',
    chip: 'bg-graphite-100 text-graphite-700',
    gradient: 'from-graphite-400 via-graphite-600 to-graphite-800',
  },
  ricardo: {
    ring: 'ring-flame-200',
    chip: 'bg-flame-50 text-flame-600',
    gradient: 'from-flame-400 via-flame-500 to-flame-700',
  },
};

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function Team() {
  const { t } = useI18n();

  return (
    <Section id="equipa" className="bg-graphite-50" labelledBy="equipa-title">
      <div aria-hidden="true" className="bg-technical-grid" />
      <Container size="wide" className="relative">
        <SectionHeading
          eyebrow={t.team.eyebrow}
          title={t.team.title}
          subtitle={t.team.subtitle}
          titleId="equipa-title"
        />

        <RevealGroup
          as="ul"
          className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4"
          staggerChildren={0.08}
        >
          {TEAM_IDS.map((id, index) => {
            const member = t.team.items[id];
            const tone = MEMBER_TONES[id];
            return (
              <RevealItem
                as="li"
                key={id}
                distance={24}
                className="group flex h-full flex-col items-center rounded-4xl border border-graphite-200/70 bg-white p-7 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-200 hover:shadow-lift"
              >
                {/* Monograma com anel — placeholder elegante para o retrato */}
                <span className="relative inline-flex">
                  <span
                    className={cn(
                      'inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br font-display text-2xl font-bold text-white ring-4 ring-offset-2 transition-transform duration-300 group-hover:scale-[1.03]',
                      tone.gradient,
                      tone.ring,
                    )}
                    aria-hidden="true"
                  >
                    {initials(member.name)}
                  </span>
                  <span
                    className={cn(
                      'absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white',
                      tone.chip,
                    )}
                    aria-hidden="true"
                  >
                    {(() => {
                      const Icon = TEAM_FALLBACK_ICONS[id];
                      return <Icon className="h-4 w-4" />;
                    })()}
                  </span>
                </span>

                <h3 className="mt-6 font-display text-lg font-semibold text-graphite-950">
                  {member.name}
                </h3>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-600">
                  <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-graphite-500">{member.bio}</p>

                {/* Responsabilidade técnica destacada (ex.: certificação de gás) */}
                {member.responsibility ? (
                  <div className="mt-5 w-full rounded-2xl border border-flame-200/70 bg-flame-50/70 px-4 py-3 text-left">
                    {member.certifies ? (
                      <p className="text-2xs font-bold uppercase tracking-[0.14em] text-flame-700">
                        {member.certifies}
                      </p>
                    ) : null}
                    <p className="mt-1.5 flex items-start gap-2 text-xs leading-snug text-graphite-600">
                      <ShieldCheck
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-flame-600"
                        aria-hidden="true"
                      />
                      {member.responsibility}
                    </p>
                  </div>
                ) : null}

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <a
                    href={telHref(0)}
                    aria-label={`${t.contact.callNow} — ${member.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-graphite-200 text-graphite-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-600"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={mailHref(`Contato para ${member.name}`)}
                    aria-label={`${t.contact.emailTitle} — ${member.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-graphite-200 text-graphite-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-600"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-graphite-50 px-3 text-2xs font-medium uppercase tracking-wider text-graphite-500">
                    <Flame className="h-3.5 w-3.5 text-flame-500" aria-hidden="true" />
                    Falcão
                  </span>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </Section>
  );
}
