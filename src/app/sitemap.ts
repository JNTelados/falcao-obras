import type { MetadataRoute } from 'next';
import { COMPANY, SECTION_IDS } from '@/lib/site';

// Necessário para o modo de exportação estática (`EXPORT=1`).
export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    // Âncoras relevantes da página única (ajudam a descoberta de conteúdo).
    ...SECTION_IDS.filter((id) => id !== 'inicio').map((id) => ({
      url: `${siteUrl}/#${id}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
