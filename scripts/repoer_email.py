"""Repoe o e-mail de contacto nas interfaces do site (footer, header, contato,
localizacao, equipa) e nos dados estruturados de SEO.

Feito por script para garantir consistencia e evitar erros de edicao manual.
"""
from pathlib import Path

RAIZ = Path(r'C:\rea\falcao-site')

def ler(rel):
    return (RAIZ / rel).read_text(encoding='utf-8')

def gravar(rel, texto):
    (RAIZ / rel).write_text(texto, encoding='utf-8', newline='')
    print(f'  atualizado: {rel}')


# ---------------------------------------------------------------- FOOTER
rel = 'src/components/layout/Footer.tsx'
t = ler(rel)
if 'mailHref' not in t:
    t = t.replace(
        "  Instagram,\n  Linkedin,\n  MapPin,",
        "  Instagram,\n  Linkedin,\n  Mail,\n  MapPin,",
    )
    t = t.replace(
        "  SECTION_IDS,\n  mapsHref,",
        "  SECTION_IDS,\n  mailHref,\n  mapsHref,",
    )
    alvo = """              <li>
                <a
                  href={mapsHref()}"""
    novo = """              <li>
                <a
                  href={mailHref()}
                  className="inline-flex items-start gap-3 text-graphite-400 transition-colors hover:text-gold-300"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a
                  href={mapsHref()}"""
    if alvo in t:
        t = t.replace(alvo, novo, 1)
        gravar(rel, t)
    else:
        print('  [aviso] footer: ponto de insercao nao encontrado')
else:
    print('  footer ja tem o e-mail')


# ---------------------------------------------------------------- HEADER
rel = 'src/components/layout/Header.tsx'
t = ler(rel)
if 'mailHref' not in t:
    t = t.replace(
        "import { MapPin, Menu, Phone, X, Clock, ArrowRight } from 'lucide-react';",
        "import { Mail, MapPin, Menu, Phone, X, Clock, ArrowRight } from 'lucide-react';",
    )
    t = t.replace(
        "import { COMPANY, SECTION_IDS, telHref, mapsHref, whatsappHref, type SectionId } from '@/lib/site';",
        "import { COMPANY, SECTION_IDS, telHref, mapsHref, mailHref, whatsappHref, type SectionId } from '@/lib/site';",
    )
    # barra superior (desktop): depois do 2.o telefone
    alvo1 = """                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {COMPANY.phones[1].display}
              </a>
            </div>"""
    novo1 = """                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                {COMPANY.phones[1].display}
              </a>
              <a
                href={mailHref()}
                className="inline-flex items-center gap-2 transition-colors hover:text-gold-300"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                {COMPANY.email}
              </a>
            </div>"""
    trocou1 = alvo1 in t
    if trocou1:
        t = t.replace(alvo1, novo1, 1)

    # menu mobile: depois do mapa de telefones
    alvo2 = """                {COMPANY.phones.map((phone, i) => (
                  <a key={phone.raw} href={telHref(i)} className="inline-flex items-center gap-2 hover:text-graphite-950">
                    <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" />
                    {phone.display}
                  </a>
                ))}
              </div>"""
    novo2 = """                {COMPANY.phones.map((phone, i) => (
                  <a key={phone.raw} href={telHref(i)} className="inline-flex items-center gap-2 hover:text-graphite-950">
                    <Phone className="h-4 w-4 text-gold-500" aria-hidden="true" />
                    {phone.display}
                  </a>
                ))}
                <a href={mailHref()} className="inline-flex items-center gap-2 hover:text-graphite-950">
                  <Mail className="h-4 w-4 text-gold-500" aria-hidden="true" />
                  {COMPANY.email}
                </a>
              </div>"""
    trocou2 = alvo2 in t
    if trocou2:
        t = t.replace(alvo2, novo2, 1)

    if trocou1 or trocou2:
        gravar(rel, t)
    else:
        print('  [aviso] header: pontos de insercao nao encontrados')
else:
    print('  header ja tem o e-mail')


# --------------------------------------------------------------- CONTACT
rel = 'src/components/sections/Contact.tsx'
t = ler(rel)
if 'mailHref' not in t:
    t = t.replace(
        "import { Clock, MapPin, Phone, ShieldCheck, Timer } from 'lucide-react';",
        "import { Clock, Mail, MapPin, Phone, ShieldCheck, Timer } from 'lucide-react';",
    )
    t = t.replace(
        "import { COMPANY, telHref, whatsappHref } from '@/lib/site';",
        "import { COMPANY, telHref, mailHref, whatsappHref } from '@/lib/site';",
    )
    alvo = """              <div className="rounded-3xl border border-graphite-200/70 bg-graphite-50 p-5 sm:col-span-2">"""
    novo = """              <a
                href={mailHref()}
                className="group rounded-3xl border border-graphite-200/70 bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-gold-200 hover:shadow-card sm:col-span-2"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-graphite-100 text-graphite-700 ring-1 ring-graphite-200/80">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-2xs font-bold uppercase tracking-[0.16em] text-graphite-500">
                      {t.contact.emailTitle}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-graphite-950 group-hover:text-gold-700">
                      {COMPANY.email}
                    </p>
                  </div>
                </div>
              </a>

              <div className="rounded-3xl border border-graphite-200/70 bg-graphite-50 p-5 sm:col-span-2">"""
    if alvo in t:
        t = t.replace(alvo, novo, 1)
        gravar(rel, t)
    else:
        print('  [aviso] contact: ponto de insercao nao encontrado')
else:
    print('  contact ja tem o e-mail')


# -------------------------------------------------------------- LOCATION
rel = 'src/components/sections/Location.tsx'
t = ler(rel)
if 'mailHref' not in t:
    t = t.replace(
        "import { Car, Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';",
        "import { Car, Clock, ExternalLink, Mail, MapPin, Navigation, Phone } from 'lucide-react';",
    )
    t = t.replace(
        "import { COMPANY, mapsEmbedSrc, mapsHref, telHref } from '@/lib/site';",
        "import { COMPANY, mailHref, mapsEmbedSrc, mapsHref, telHref } from '@/lib/site';",
    )
    alvo = """                ))}
              </ul>
            </div>"""
    novo = """                ))}
                <li>
                  <a
                    href={mailHref()}
                    className="group flex items-center justify-between gap-4 rounded-2xl bg-white/[0.05] px-4 py-3.5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-400/12 hover:ring-gold-400/25"
                  >
                    <span className="flex flex-col">
                      <span className="text-sm font-medium text-white">{COMPANY.email}</span>
                      <span className="text-2xs uppercase tracking-[0.16em] text-graphite-400">
                        {t.contact.emailTitle}
                      </span>
                    </span>
                    <Mail className="h-4 w-4 text-gold-300" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </div>"""
    if alvo in t:
        t = t.replace(alvo, novo, 1)
        gravar(rel, t)
    else:
        print('  [aviso] location: ponto de insercao nao encontrado')
else:
    print('  location ja tem o e-mail')


# ------------------------------------------------------------------ TEAM
rel = 'src/components/sections/Team.tsx'
t = ler(rel)
if 'mailHref' not in t:
    t = t.replace(
        "import { BadgeCheck, Flame, Phone, ShieldCheck } from 'lucide-react';",
        "import { BadgeCheck, Flame, Mail, Phone, ShieldCheck } from 'lucide-react';",
    )
    t = t.replace(
        "import { COMPANY, TEAM_IDS, telHref, type TeamId } from '@/lib/site';",
        "import { COMPANY, TEAM_IDS, telHref, mailHref, type TeamId } from '@/lib/site';",
    )
    alvo = """                  ))}
                  <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-graphite-50 px-3 text-2xs font-medium uppercase tracking-wider text-graphite-500">"""
    novo = """                  ))}
                  <a
                    href={mailHref(`Contato para ${member.name}`)}
                    aria-label={`${t.contact.emailTitle} — ${member.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-graphite-200 text-graphite-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-50 hover:text-gold-600"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <span className="inline-flex h-10 items-center gap-2 rounded-xl bg-graphite-50 px-3 text-2xs font-medium uppercase tracking-wider text-graphite-500">"""
    if alvo in t:
        t = t.replace(alvo, novo, 1)
        gravar(rel, t)
    else:
        print('  [aviso] team: ponto de insercao nao encontrado')
else:
    print('  team ja tem o e-mail')


# -------------------------------------------------------- DADOS ESTRUTURADOS
rel = 'src/components/seo/StructuredData.tsx'
t = ler(rel)
if 'email: COMPANY.email' not in t:
    t = t.replace(
        "        telephone: COMPANY.phones.map((p) => `+${p.raw}`),\n        // Sem `email`: o contacto é apenas por telefone e WhatsApp\n        // (a caixa de correio institucional ainda não existe).\n",
        "        telephone: COMPANY.phones.map((p) => `+${p.raw}`),\n        email: COMPANY.email,\n",
    )
    gravar(rel, t)
else:
    print('  structured data ja tem o e-mail')

print('\nConcluido.')
