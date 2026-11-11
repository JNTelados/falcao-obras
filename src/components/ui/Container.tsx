import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Grade central do site: largura máxima e respiro lateral consistentes. */
export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}) {
  const sizes = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
  } as const;
  return (
    <div className={cn('mx-auto w-full px-5 sm:px-8 lg:px-10', sizes[size], className)}>
      {children}
    </div>
  );
}

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Espaçamento vertical padrão; `compact` para secções encadeadas. */
  spacing?: 'default' | 'compact' | 'loose';
  as?: 'section' | 'div';
  labelledBy?: string;
}

export function Section({
  id,
  children,
  className,
  spacing = 'default',
  as = 'section',
  labelledBy,
}: SectionProps) {
  const Tag = as;
  const spacings = {
    compact: 'py-14 sm:py-16',
    default: 'py-18 sm:py-22 lg:py-30',
    loose: 'py-22 sm:py-30 lg:py-36',
  } as const;

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative scroll-mt-24', spacings[spacing], className)}
    >
      {children}
    </Tag>
  );
}
