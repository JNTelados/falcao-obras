'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { EASE } from '@/lib/motion';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'outlineLight';
type Size = 'sm' | 'md' | 'lg';

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold tracking-tight transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-[0.95rem]',
  lg: 'px-8 py-4 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-gradient-to-b from-graphite-800 to-graphite-900 text-white shadow-card ring-1 ring-black/10 hover:from-graphite-700 hover:to-graphite-800 hover:shadow-lift',
  secondary:
    'bg-gradient-to-r from-gold-400 to-gold-500 text-graphite-950 shadow-gold hover:from-gold-300 hover:to-gold-400',
  ghost:
    'bg-white text-graphite-700 ring-1 ring-graphite-200 hover:ring-graphite-300 hover:text-graphite-950 shadow-soft',
  outlineLight:
    'bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20',
  whatsapp:
    'bg-[#25D366] text-white shadow-card hover:bg-[#1fbe5a] hover:shadow-lift',
};

const hoverMotion = {
  y: -2,
  transition: { duration: 0.28, ease: EASE },
};

const tapMotion = { scale: 0.975 };

function Inner({ children, iconLeft, iconRight }: Pick<CommonProps, 'children' | 'iconLeft' | 'iconRight'>) {
  return (
    <>
      {iconLeft ? <span className="shrink-0" aria-hidden="true">{iconLeft}</span> : null}
      <span className="relative">{children}</span>
      {iconRight ? (
        <span
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          {iconRight}
        </span>
      ) : null}
    </>
  );
}

interface ButtonProps extends CommonProps {
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
  ariaBusy?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  iconLeft,
  iconRight,
  fullWidth,
  onClick,
  type = 'button',
  disabled,
  ariaLabel,
  ariaBusy,
}: ButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
      whileHover={reduce || disabled ? undefined : hoverMotion}
      whileTap={reduce || disabled ? undefined : tapMotion}
      className={cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)}
    >
      <Inner iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Inner>
    </motion.button>
  );
}

interface LinkButtonProps extends CommonProps {
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

export function LinkButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  iconLeft,
  iconRight,
  fullWidth,
  external,
  ariaLabel,
}: LinkButtonProps) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      whileHover={reduce ? undefined : hoverMotion}
      whileTap={reduce ? undefined : tapMotion}
      className={cn(base, sizes[size], variants[variant], fullWidth && 'w-full', className)}
    >
      <Inner iconLeft={iconLeft} iconRight={iconRight}>
        {children}
      </Inner>
    </motion.a>
  );
}
