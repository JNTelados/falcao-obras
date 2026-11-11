'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type LogoVariant = 'lockup' | 'emblem' | 'stacked' | 'wordmark';

const SOURCES: Record<LogoVariant, { src: string; width: number; height: number }> = {
  lockup: { src: '/brand/lockup-horizontal.png', width: 1033, height: 290 },
  stacked: { src: '/brand/logo-stacked.png', width: 526, height: 435 },
  emblem: { src: '/brand/emblem.png', width: 667, height: 486 },
  wordmark: { src: '/brand/wordmark.png', width: 848, height: 152 },
};

interface LogoProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
  /** Altura renderizada em px — controla a nitidez e o layout. */
  height?: number;
  alt?: string;
}

/**
 * Logo oficial da Falcão Obras & Remodelações.
 * Os ficheiros têm alfa real, por isso brilham sobre fundos escuros
 * — a navbar e o rodapé usam superfícies escuras justamente por isso.
 */
export function Logo({
  variant = 'lockup',
  className,
  priority = false,
  height,
  alt = 'Falcão Obras & Remodelações',
}: LogoProps) {
  const source = SOURCES[variant];
  const h = height ?? (variant === 'emblem' ? 44 : variant === 'stacked' ? 132 : 44);
  const w = Math.round((source.width / source.height) * h);

  return (
    <Image
      src={source.src}
      alt={alt}
      width={w}
      height={h}
      priority={priority}
      sizes={`${w}px`}
      className={cn('select-none object-contain', className)}
      style={{ width: w, height: h }}
      draggable={false}
    />
  );
}

/** Marca compacta (emblema) usada em contextos com pouco espaço. */
export function LogoMark({ className, height = 36 }: { className?: string; height?: number }) {
  return <Logo variant="emblem" height={height} className={className} alt="Falcão" />;
}
