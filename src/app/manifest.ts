import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/site';

// Necessário para o modo de exportação estática (`EXPORT=1`).
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COMPANY.legalName,
    short_name: COMPANY.name,
    description:
      'Instalações de gás, águas e esgotos, remodelações gerais e pinturas com técnicos certificados.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#101216',
    lang: 'pt-BR',
    dir: 'ltr',
    categories: ['business', 'construction', 'services'],
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
