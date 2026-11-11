'use client';

import type { ReactNode } from 'react';
import { I18nProvider } from '@/i18n/I18nProvider';

/** Providers de cliente do site (idioma persistido em localStorage). */
export function Providers({ children }: { children: ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
