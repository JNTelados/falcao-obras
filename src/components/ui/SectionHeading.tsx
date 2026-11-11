import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
  /** id aplicado ao <h2>, permitindo aria-labelledby nas secções. */
  titleId?: string;
  children?: ReactNode;
}

/** Cabeçalho de secção com hierarquia consistente em todo o site. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  className,
  titleId,
  children,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'flex max-w-3xl flex-col gap-4',
        centered && 'mx-auto items-center text-center',
        className,
      )}
    >
      <span
        className={cn(
          'inline-flex items-center gap-2 text-2xs font-bold uppercase tracking-[0.24em]',
          tone === 'dark' ? 'text-gold-600' : 'text-gold-300',
        )}
      >
        <span
          className={cn(
            'h-px w-8 rounded-full',
            tone === 'dark'
              ? 'bg-gradient-to-r from-transparent to-gold-500'
              : 'bg-gradient-to-r from-transparent to-gold-300',
          )}
          aria-hidden="true"
        />
        {eyebrow}
      </span>
      <h2
        id={titleId}
        className={cn(
          'font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.6rem]',
          tone === 'dark' ? 'text-graphite-950' : 'text-white',
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            'text-base leading-relaxed sm:text-[1.05rem]',
            tone === 'dark' ? 'text-graphite-600' : 'text-graphite-300',
          )}
        >
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}
