/**
 * Dados institucionais da Falcão Obras & Remodelações.
 * Ponto único de verdade para contactos, links e horários.
 */

export const COMPANY = {
  name: 'Falcão',
  legalName: 'Falcão Obras & Remodelações',
  tagline: 'Olho de falcão, mão de profissional.',
  /** Endereço público do site (usado em SEO, partilha e dados estruturados). */
  siteUrl: 'https://falcaoobras.pt',
  /**
   * E-mail institucional: mantido apenas para uso interno/SEO.
   * NÃO é exibido no site (caixa de correio ainda não criada).
   */
  email: 'geral@falcaoobras.pt',
  /** Números exibidos no site (formato nacional). */
  phones: [
    { raw: '351936628585', display: '936 628 585', label: 'Telemóvel' },
    { raw: '351924108625', display: '924 108 625', label: 'Telemóvel' },
  ],
  address: {
    street: 'Rua Oliveira Feijão, nº 1',
    locality: 'Charneca da Caparica',
    region: 'Almada',
    postalCode: '2825-130',
    country: 'PT',
    countryName: 'Portugal',
  },
  hours: {
    weekdays: 'Segunda a Sexta · 08:00 — 19:00',
    saturday: 'Sábado · 09:00 — 14:00',
    sunday: 'Domingo · Apenas emergências',
  },
  geo: { lat: 38.6151, lng: -9.1902 },
  founded: 2009,
  stats: { projects: 2400, years: 17, rating: 4.9, reviews: 312 },
  /** Taxas de deslocação por zona (euros). */
  travelFees: [
    { region: 'Lisboa e região', fee: 45 },
    { region: 'Setúbal', fee: 35 },
  ],
} as const;

export const WHATSAPP_MESSAGE =
  'Olá Falcão! Gostaria de pedir um orçamento para a minha obra.';

/** Link de WhatsApp para o primeiro número (usado nos botões principais). */
export const whatsappHref = (message: string = WHATSAPP_MESSAGE, index = 0) =>
  `https://wa.me/${COMPANY.phones[index].raw}?text=${encodeURIComponent(message)}`;

export const telHref = (index = 0) => `tel:+${COMPANY.phones[index].raw}`;

/**
 * O contacto é feito apenas por telefone e WhatsApp.
 * O e-mail institucional não é divulgado (caixa ainda não criada),
 * por isso não há helper de `mailto:` — evita mostrar um endereço inexistente.
 */
export const whatsappMessageFor = (texto: string) => whatsappHref(texto);

export const mapsHref = () => {
  const q = encodeURIComponent(
    `${COMPANY.address.street}, ${COMPANY.address.postalCode} ${COMPANY.address.locality}, ${COMPANY.address.countryName}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
};

export const mapsEmbedSrc = () => {
  const { lat, lng } = COMPANY.geo;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.012}%2C${lat - 0.008}%2C${lng + 0.012}%2C${lat + 0.008}&layer=mapnik&marker=${lat}%2C${lng}`;
};

/** Chaves das secções usadas na navegação, no rodapé e nos links de âncora. */
export const SECTION_IDS = [
  'inicio',
  'sobre',
  'servicos',
  'diferenciais',
  'depoimentos',
  'equipa',
  'localizacao',
  'faq',
  'contacto',
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** Identificadores estáveis dos serviços (traduzidos no dicionário). */
export const SERVICE_IDS = [
  'gas',
  'aguas',
  'remodelacao',
  'pintura',
  'esgotos',
  'manutencao',
  'emergencia',
  'avaliacao',
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

export const DIFFERENTIAL_IDS = [
  'certificacao',
  'equipa',
  'prazos',
  'garantia',
  'orcamento',
  'limpeza',
] as const;

export type DifferentialId = (typeof DIFFERENTIAL_IDS)[number];

export const TEAM_IDS = ['olavo', 'luisa', 'olavo-junior', 'ricardo'] as const;
export type TeamId = (typeof TEAM_IDS)[number];

export const TESTIMONIAL_IDS = ['joana', 'miguel', 'helena', 'tiago'] as const;
export type TestimonialId = (typeof TESTIMONIAL_IDS)[number];

export const FAQ_IDS = [
  'orcamento',
  'prazos',
  'certificado',
  'certificacao-independente',
  'garantia',
  'deslocacao',
  'pagamento',
  'urgencia',
] as const;
export type FaqId = (typeof FAQ_IDS)[number];

export const TREATMENT_IDS = SERVICE_IDS;
