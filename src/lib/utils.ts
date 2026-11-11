import type { ReactNode } from 'react';

/** Junta classes condicionalmente (substituto leve de clsx). */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Rola suavemente até uma secção, respeitando a altura do cabeçalho fixo. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const offset = (header?.offsetHeight ?? 72) + 12;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
}

/** Formata um número de telefone apenas com dígitos. */
export function phoneDigits(value: string) {
  return value.replace(/\D/g, '');
}

export type WithChildren<T = object> = T & { children?: ReactNode };
