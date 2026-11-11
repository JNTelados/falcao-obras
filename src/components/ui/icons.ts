import {
  AreaChart,
  BadgeCheck,
  Bath,
  Brush,
  Building2,
  CalendarCheck,
  Droplets,
  Flame,
  Gauge,
  HardHat,
  Hammer,
  PhoneCall,
  Ruler,
  ShieldCheck,
  Sparkles,
  Timer,
  Wallet,
  Waves,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { DifferentialId, ServiceId, TeamId } from '@/lib/site';

/** Ícone + tom de cor de cada serviço (mantém cards visualmente equilibrados). */
export const SERVICE_ICONS: Record<ServiceId, { Icon: LucideIcon; tone: 'gold' | 'aqua' | 'ember' | 'flame' | 'graphite' }> = {
  gas: { Icon: Flame, tone: 'flame' },
  aguas: { Icon: Droplets, tone: 'aqua' },
  remodelacao: { Icon: Hammer, tone: 'gold' },
  pintura: { Icon: Brush, tone: 'ember' },
  esgotos: { Icon: Waves, tone: 'aqua' },
  manutencao: { Icon: Wrench, tone: 'graphite' },
  emergencia: { Icon: PhoneCall, tone: 'ember' },
  avaliacao: { Icon: ShieldCheck, tone: 'gold' },
};

export const DIFFERENTIAL_ICONS: Record<DifferentialId, LucideIcon> = {
  certificacao: BadgeCheck,
  equipa: HardHat,
  prazos: Timer,
  garantia: ShieldCheck,
  orcamento: Wallet,
  limpeza: Sparkles,
};

export const PROCESS_ICONS: LucideIcon[] = [PhoneCall, Ruler, HardHat, CalendarCheck];

export const TEAM_FALLBACK_ICONS: Record<TeamId, LucideIcon> = {
  olavo: Flame,
  luisa: Ruler,
  'olavo-junior': Brush,
  ricardo: BadgeCheck,
};

/** Ícones auxiliares usados em listas e destaques. */
export const AUX_ICONS = {
  bath: Bath,
  building: Building2,
  gauge: Gauge,
  chart: AreaChart,
  check: BadgeCheck,
} satisfies Record<string, LucideIcon>;
