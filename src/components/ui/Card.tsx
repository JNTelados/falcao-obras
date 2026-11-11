'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Elevação no hover — desativar em cards que já têm sombra própria. */
  interactive?: boolean;
}

/** Cartão base: bordas suaves, sombra leve e microinteração discreta. */
export function Card({ children, className, interactive = true }: CardProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce || !interactive ? undefined : { y: -5 }}
      transition={{ duration: 0.35, ease: EASE }}
      className={cn(
        'relative h-full overflow-hidden rounded-3xl border border-graphite-200/70 bg-white p-6 shadow-soft transition-shadow duration-300 sm:p-7',
        interactive && 'hover:border-graphite-300/80 hover:shadow-card',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

interface IconBadgeProps {
  children: ReactNode;
  tone?: 'gold' | 'aqua' | 'ember' | 'flame' | 'graphite';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const tones: Record<NonNullable<IconBadgeProps['tone']>, string> = {
  gold: 'bg-gold-50 text-gold-600 ring-gold-200/60 group-hover:bg-gold-100',
  aqua: 'bg-aqua-50 text-aqua-600 ring-aqua-200/60 group-hover:bg-aqua-100',
  ember: 'bg-ember-50 text-ember-600 ring-ember-200/60 group-hover:bg-ember-100',
  flame: 'bg-flame-50 text-flame-600 ring-flame-200/60 group-hover:bg-flame-100',
  graphite: 'bg-graphite-100 text-graphite-600 ring-graphite-200/70 group-hover:bg-graphite-200',
};

const iconSizes = {
  sm: 'h-9 w-9 rounded-xl [&>svg]:h-4 [&>svg]:w-4',
  md: 'h-12 w-12 rounded-2xl [&>svg]:h-6 [&>svg]:w-6',
  lg: 'h-14 w-14 rounded-2xl [&>svg]:h-7 [&>svg]:w-7',
};

/** Selo de ícone quadrado com anel suave — usado nos cards de serviço. */
export function IconBadge({ children, tone = 'gold', className, size = 'md' }: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center ring-1 transition-colors duration-300',
        tones[tone],
        iconSizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/** Pequena etiqueta/pill informativa. */
export function Pill({
  children,
  className,
  tone = 'light',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'light' | 'dark' | 'gold';
}) {
  const tones = {
    light: 'bg-white/80 text-graphite-700 ring-graphite-200',
    dark: 'bg-white/10 text-graphite-100 ring-white/15',
    gold: 'bg-gold-400/15 text-gold-200 ring-gold-300/30',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium ring-1 backdrop-blur-sm',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
