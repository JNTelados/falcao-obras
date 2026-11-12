import type { Metadata, Viewport } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { pt } from '@/i18n/dictionaries';
import { COMPANY } from '@/lib/site';
import { Providers } from './providers';
import { StructuredData } from '@/components/seo/StructuredData';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  adjustFontFallback: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  weight: ['600', '700'],
  variable: '--font-display',
  preload: true,
  adjustFontFallback: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pt.meta.title,
    template: `%s | ${COMPANY.legalName}`,
  },
  description: pt.meta.description,
  keywords: pt.meta.keywords,
  applicationName: COMPANY.legalName,
  authors: [{ name: COMPANY.legalName, url: siteUrl }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  category: 'Construção e serviços técnicos',
  alternates: {
    canonical: '/',
    languages: {
      'pt-BR': '/',
      en: '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: siteUrl,
    siteName: COMPANY.legalName,
    title: pt.meta.title,
    description: pt.meta.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `${COMPANY.legalName} — ${COMPANY.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pt.meta.title,
    description: pt.meta.description,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#101216' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="min-h-screen bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
