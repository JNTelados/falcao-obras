'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE, viewportOnce } from '@/lib/motion';

/**
 * Deteta se o elemento já está no ecrã no primeiro render.
 *
 * Motivo: `whileInView` depende de um evento do IntersectionObserver. Se o
 * utilizador abrir a página com um viewport alto (ou já com scroll), várias
 * secções estão visíveis desde o início e a animação de entrada nunca corre —
 * o conteúdo ficaria invisível. Com este hook, o que já está no ecrã aparece
 * imediatamente e o que está abaixo continua a animar ao entrar.
 */
function useRevealState<T extends HTMLElement>(amount = 0.15) {
  const ref = useRef<T | null>(null);
  const [state, setState] = useState<'hidden' | 'visible'>('hidden');
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Só depois de montar é que o movimento é acrescentado: o HTML inicial
  // (SSR/JS desativado/capturas) permanece sempre visível.
  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isVisible = () => {
      const rect = el.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const ratio = Math.min(rect.bottom, viewport) - Math.max(rect.top, 0);
      return ratio > Math.min(rect.height * amount, viewport * 0.25);
    };

    if (isVisible()) {
      setState('visible');
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setState('visible');
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold: [0, Math.min(amount, 0.5)], rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(el);
    // Garante que o conteúdo nunca fica preso em `hidden`.
    const failsafe = window.setTimeout(() => setReady(true), 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [amount]);

  return { ref, state, ready, mounted };
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: Variants;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'footer' | 'aside';
  amount?: number;
}

/** Revela o conteúdo com um fade discreto quando entra no ecrã. */
export function Reveal({
  children,
  className,
  delay = 0,
  variants,
  as = 'div',
  amount,
}: RevealProps) {
  const reduce = useReducedMotion();
  const { ref, state, ready, mounted } = useRevealState<HTMLDivElement>(amount);
  const MotionTag = motion[as] as typeof motion.div;

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE, delay } },
  };

  // Sem movimento: prefers-reduced-motion, ainda não montado ou failsafe.
  if (reduce || !mounted || (ready && state === 'hidden')) {
    const Tag = as as 'div';
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={variants ?? defaultVariants}
      initial="hidden"
      animate={state}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
  amount?: number;
}

/** Container que anima os filhos em cascata (usar com <RevealItem>). */
export function RevealGroup({
  children,
  className,
  staggerChildren = 0.09,
  delayChildren = 0.05,
  as = 'div',
  amount = 0.1,
}: RevealGroupProps) {
  const reduce = useReducedMotion();
  const { ref, state, ready, mounted } = useRevealState<HTMLDivElement>(amount);
  const MotionTag = motion[as] as typeof motion.div;

  if (reduce || !mounted || (ready && state === 'hidden')) {
    const Tag = as as 'div';
    return (
      <Tag ref={ref} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
      initial="hidden"
      animate={state}
    >
      {children}
    </MotionTag>
  );
}

/** Item animado dentro de <RevealGroup>. */
export function RevealItem({
  children,
  className,
  as = 'div',
  distance = 20,
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const Tag = as as 'div';

  if (reduce) return <Tag className={cn(className)}>{children}</Tag>;

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Reexportado para conveniência em secções que ainda usam viewport manual. */
export { viewportOnce };
