import type { MetadataRoute } from 'next';
import { COMPANY } from '@/lib/site';

// Necessário para o modo de exportação estática (`EXPORT=1`).
export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
