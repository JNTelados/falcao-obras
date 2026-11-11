import type { Variants, Transition } from 'framer-motion';

/** Curva de aceleração usada em todo o site — discreta e natural. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = {
  duration: 0.65,
  ease: EASE,
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** Container que escalona a entrada dos filhos. */
export const stagger = (staggerChildren = 0.09, delayChildren = 0.05): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Item de lista animado dentro de um container `stagger`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

/** Efeito de hover aplicado a cards (elevação suave). */
export const cardHover = {
  y: -6,
  transition: { duration: 0.35, ease: EASE },
} as const;

export const viewportOnce = { once: true, amount: 0.2 } as const;
