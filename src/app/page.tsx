import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Services } from '@/components/sections/Services';
import { Differentials } from '@/components/sections/Differentials';
import { Testimonials } from '@/components/sections/Testimonials';
import { Team } from '@/components/sections/Team';
import { Location } from '@/components/sections/Location';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { CtaBanner } from '@/components/sections/CtaBanner';

export default function HomePage() {
  return (
    <>
      {/* Link de salto para leitores de tela e navegação por teclado */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-graphite-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Ir para o conteúdo principal
      </a>

      <Header />

      {/* pt-[4.5rem] = navbar mobile (72px) · lg:pt-28 = topbar 40px + navbar 72px */}
      <main className="pt-18 lg:pt-28">
        <Hero />
        <About />
        <Services />
        <Differentials />
        <Testimonials />
        <Team />
        <Location />
        <Faq />
        <Contact />
        <CtaBanner />
      </main>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
