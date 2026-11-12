import { COMPANY, whatsappHref } from '@/lib/site';

/**
 * Dados estruturados (schema.org) para SEO local.
 * Ajuda o Google a exibir telefone, endereço, horários e avaliações.
 */
export function StructuredData() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.siteUrl;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'GeneralContractor', 'Plumber'],
        '@id': `${url}/#business`,
        name: COMPANY.legalName,
        alternateName: COMPANY.name,
        description:
          'Empresa especializada em instalações de gás, águas e esgotos, remodelações gerais e pinturas, com técnicos certificados e garantia por escrito.',
        slogan: COMPANY.tagline,
        url,
        telephone: COMPANY.phones.map((p) => `+${p.raw}`),
        // Sem `email`: o contacto é apenas por telefone e WhatsApp
        // (a caixa de correio institucional ainda não existe).
        image: `${url}/og-image.png`,
        logo: `${url}/brand/lockup-horizontal-dark.png`,
        priceRange: '€€',
        foundingDate: String(COMPANY.founded),
        address: {
          '@type': 'PostalAddress',
          streetAddress: COMPANY.address.street,
          addressLocality: COMPANY.address.locality,
          addressRegion: COMPANY.address.region,
          postalCode: COMPANY.address.postalCode,
          addressCountry: COMPANY.address.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: COMPANY.geo.lat,
          longitude: COMPANY.geo.lng,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '08:00',
            closes: '19:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Saturday'],
            opens: '09:00',
            closes: '14:00',
          },
        ],
        areaServed: [
          'Charneca da Caparica',
          'Costa da Caparica',
          'Almada',
          'Lisboa',
          'Setúbal',
          'Sesimbra',
          'Palmela',
          'Barreiro',
          'Montijo',
          'Sintra',
          'Cascais',
          'Oeiras',
        ].map((name) => ({ '@type': 'City', name })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: COMPANY.stats.rating,
          reviewCount: COMPANY.stats.reviews,
          bestRating: 5,
        },
        sameAs: [whatsappHref()],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Serviços Falcão Obras & Remodelações',
          itemListElement: [
            'Instalações de gás',
            'Águas e esgotos',
            'Remodelação geral',
            'Pinturas',
            'Desentupimento e saneamento',
            'Manutenção preventiva',
            'Emergência 24 horas',
            'Avaliação preventiva',
          ].map((name) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name },
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name: COMPANY.legalName,
        inLanguage: ['pt-BR', 'en'],
        publisher: { '@id': `${url}/#business` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'A visita e o orçamento têm algum custo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'O orçamento é gratuito. A visita técnica tem taxa fixa de deslocação: 45 € para Lisboa e região e 35 € para Setúbal, descontada do valor final se o serviço for aprovado.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quanto tempo leva uma obra de remodelação?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depende do escopo: pintura completa de um T2 leva de 3 a 5 dias e uma remodelação integral entre 4 e 10 semanas, sempre com cronograma por etapa.',
            },
          },
          {
            '@type': 'Question',
            name: 'Vocês emitem certificado de instalação de gás?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sim. Executamos a instalação conforme as normas técnicas aplicáveis e emitimos o certificado e a documentação para vistoria.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quem certifica as obras de gás depois de prontas?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A certificação é feita por um técnico próprio e independente da execução: quem instala não é quem assina o termo de responsabilidade. O técnico certificador faz o teste final de estanqueidade apenas das obras de gás e emite o termo de responsabilidade.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Conteúdo estático e controlado — sem entrada de utilizador.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
