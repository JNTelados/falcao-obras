/**
 * Dicionário oficial do site (PT-BR é o idioma padrão).
 * Toda a cópia textual vive aqui — os componentes apenas consomem chaves tipadas.
 */

export type Locale = 'pt' | 'en';

export const LOCALES: { code: Locale; label: string; short: string; htmlLang: string; flag: string }[] = [
  { code: 'pt', label: 'Português (Brasil)', short: 'PT', htmlLang: 'pt-BR', flag: '🇧🇷' },
  { code: 'en', label: 'English', short: 'EN', htmlLang: 'en', flag: '🇺🇸' },
];

export const DEFAULT_LOCALE: Locale = 'pt';

export interface ServiceCopy {
  title: string;
  summary: string;
  bullets: string[];
}

export interface DetailCopy {
  title: string;
  text: string;
}

export interface TestimonialCopy {
  name: string;
  role: string;
  quote: string;
}

export interface TeamCopy {
  name: string;
  role: string;
  bio: string;
  /** Especialidade certificada (usado pelo técnico certificador de gás). */
  certifies?: string;
  /** Responsabilidade técnica destacada (ex.: termo de responsabilidade). */
  responsibility?: string;
}

export interface FaqCopy {
  question: string;
  answer: string;
}

export interface StepCopy {
  title: string;
  text: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
  nav: {
    inicio: string;
    sobre: string;
    servicos: string;
    diferenciais: string;
    depoimentos: string;
    equipa: string;
    localizacao: string;
    faq: string;
    contacto: string;
    orcamento: string;
    menu: string;
    close: string;
    openMenu: string;
    language: string;
    switchTo: string;
  };
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string;
    scroll: string;
    cardTitle: string;
    cardText: string;
    stats: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string[];
    highlights: DetailCopy[];
    signature: string;
    badgeYears: string;
    badgeYearsLabel: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, ServiceCopy>;
    cta: string;
    all: string;
  };
  process: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: StepCopy[];
  };
  differentials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, DetailCopy>;
  };
  testimonials: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, TestimonialCopy>;
    ratingLabel: string;
    reviewsLabel: string;
    prev: string;
    next: string;
    goTo: string;
  };
  team: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, TeamCopy>;
  };
  location: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    hoursLabel: string;
    phoneLabel: string;
    coverageLabel: string;
    coverage: string[];
    travelTitle: string;
    travelNote: string;
    travelFees: { region: string; fee: string }[];
    directions: string;
    mapTitle: string;
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, FaqCopy>;
    stillDoubts: string;
    talkNow: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      phone: string;
      phonePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      treatment: string;
      treatmentPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      consent: string;
      required: string;
      optional: string;
      successTitle: string;
      successText: string;
      successAgain: string;
      errorTitle: string;
      errorText: string;
      errors: {
        name: string;
        phone: string;
        email: string;
        treatment: string;
        message: string;
      };
    };
    infoTitle: string;
    infoText: string;
    whatsappTitle: string;
    whatsappText: string;
    callNow: string;
    emailTitle: string;
    responseTime: string;
  };
  cta: {
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
  footer: {
    about: string;
    quickLinks: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
    privacy: string;
    terms: string;
    madeWith: string;
    backToTop: string;
  };
  whatsappFloat: {
    label: string;
    tooltip: string;
  };
}

export const pt: Dictionary = {
  meta: {
    title: 'Falcão Obras & Remodelações | Gás, Águas, Esgotos e Pinturas',
    description:
      'Empresa especializada em instalações de gás, águas e esgotos, remodelações gerais e pinturas. Técnicos certificados, orçamento transparente e garantia por escrito. Peça o seu orçamento gratuito.',
    keywords: [
      'empresa de gás',
      'instalação de gás',
      'águas e esgotos',
      'remodelações',
      'pinturas',
      'orçamento de obra',
      'técnico certificado',
      'Falcão Obras',
    ],
  },
  nav: {
    inicio: 'Início',
    sobre: 'Sobre',
    servicos: 'Serviços',
    diferenciais: 'Diferenciais',
    depoimentos: 'Depoimentos',
    equipa: 'Equipe',
    localizacao: 'Localização',
    faq: 'FAQ',
    contacto: 'Contato',
    orcamento: 'Agendar orçamento',
    menu: 'Menu',
    close: 'Fechar',
    openMenu: 'Abrir menu',
    language: 'Idioma',
    switchTo: 'Mudar para English',
  },
  hero: {
    badge: 'Técnicos certificados · Atendimento em até 24h',
    title: 'Cuide da sua casa com',
    titleHighlight: 'tecnologia, conforto e confiança',
    subtitle:
      'Gás, águas e esgotos, remodelações gerais e pinturas com acabamento profissional. Uma equipe única para toda a sua obra — do diagnóstico à entrega, com prazos cumpridos e orçamento sem surpresas.',
    ctaPrimary: 'Agendar orçamento',
    ctaSecondary: 'Falar no WhatsApp',
    trust: 'Mais de 2.400 obras concluídas com avaliação média de 4,9 estrelas.',
    scroll: 'Ver serviços',
    cardTitle: 'Olho de falcão, mão de profissional',
    cardText:
      'Inspecionamos cada detalhe antes de começar. É assim que evitamos retrabalho e entregamos obra limpa na primeira visita.',
    stats: [
      { value: '17+', label: 'anos de experiência' },
      { value: '2.400+', label: 'obras concluídas' },
      { value: '4,9★', label: 'avaliação dos clientes' },
      { value: '24h', label: 'resposta de emergência' },
    ],
  },
  about: {
    eyebrow: 'Sobre a empresa',
    title: 'Uma equipe completa para cuidar de toda a sua casa',
    lead:
      'A Falcão Obras & Remodelações nasceu em 2009 com uma ideia simples: reunir num só time os serviços que uma casa precisa, sem que o cliente tenha de coordenar cinco empresas diferentes.',
    body: [
      'Começamos pelas instalações de gás e crescemos lado a lado com os nossos clientes. Hoje executamos desde a substituição de um esquentador até remodelações completas, sempre com projeto técnico, materiais de qualidade e responsável de obra dedicado.',
      'Trabalhamos com equipamentos de detecção de fugas, câmeras de inspeção de tubagem e testes de estanqueidade documentados. Cada intervenção termina com relatório, fotos e garantia por escrito — porque confiança se prova com transparência.',
    ],
    highlights: [
      {
        title: 'Equipe própria e certificada',
        text: 'Nenhum serviço é terceirizado. Os técnicos que chegam à sua casa são nossos colaboradores e estão identificados.',
      },
      {
        title: 'Diagnóstico técnico primeiro',
        text: 'Avaliamos, medimos e explicamos o problema antes de apresentar qualquer valor. Sem orçamento no escuro.',
      },
      {
        title: 'Obra limpa e organizada',
        text: 'Proteção de pisos, remoção de resíduos e limpeza final incluídos em todos os trabalhos.',
      },
      {
        title: 'Garantia por escrito',
        text: 'Até 5 anos de garantia nas instalações e 2 anos nos acabamentos, com assistência sem burocracia.',
      },
    ],
    signature: 'Equipe Falcão Obras & Remodelações',
    badgeYears: '17',
    badgeYearsLabel: 'anos de obra',
  },
  services: {
    eyebrow: 'Serviços',
    title: 'Tudo o que a sua casa precisa, num só lugar',
    subtitle:
      'Da instalação técnica ao acabamento estético: oito frentes de trabalho executadas pela mesma equipe, com padrão de qualidade único.',
    items: {
      gas: {
        title: 'Instalações de gás',
        summary:
          'Projeto, instalação, conversão e manutenção de redes de gás natural e GLP, com certificação e teste de estanqueidade.',
        bullets: [
          'Esquentadores, caldeiras e placas',
          'Detecção eletrônica de fugas',
          'Certificado de instalação e vistoria',
          'Conversão de GLP para gás natural',
          'Teste final e termo de responsabilidade emitidos por técnico certificador independente da execução',
        ],
      },
      aguas: {
        title: 'Águas e esgotos',
        summary:
          'Redes de água fria e quente, saneamento e esgoto, substituição de tubagem antiga e reparação de vazamentos.',
        bullets: [
          'Deteção de vazamentos sem quebra-quebra',
          'Substituição de tubulação de chumbo ou ferro',
          'Caixas de visita e ligações de esgoto',
          'Testes de pressão documentados',
        ],
      },
      remodelacao: {
        title: 'Remodelação geral',
        summary:
          'Reforma completa de apartamentos, casas e lojas com gestão de obra, projeto e execução por etapas.',
        bullets: [
          'Cozinhas e banheiros completos',
          'Alvenaria, pisos e revestimentos',
          'Elétrica e iluminação integradas',
          'Gestão de prazos e fornecedores',
        ],
      },
      pintura: {
        title: 'Pinturas',
        summary:
          'Pintura interior e exterior, texturas, efeitos decorativos e tratamento de fachadas com preparação profissional.',
        bullets: [
          'Preparação de superfícies e massa fina',
          'Pintura de fachadas e impermeabilização',
          'Efeitos decorativos e microcimento',
          'Tintas de baixo odor e baixa emissão',
        ],
      },
      esgotos: {
        title: 'Desentupimento e saneamento',
        summary:
          'Limpeza técnica de tubagens, desentupimento de esgotos e manutenção preventiva de redes de saneamento.',
        bullets: [
          'Inspeção por câmera',
          'Desentupimento de alta pressão',
          'Limpeza de fossas e caixas de gordura',
          'Manutenção preventiva programada',
        ],
      },
      manutencao: {
        title: 'Manutenção preventiva',
        summary:
          'Planos de manutenção periódica para residências, condomínios e comércios, com relatório técnico a cada visita.',
        bullets: [
          'Revisão de gás e águas',
          'Contratos para condomínios',
          'Checklist com fotografias',
          'Prioridade em emergências',
        ],
      },
      emergencia: {
        title: 'Emergência 24 horas',
        summary:
          'Atendimento urgente para vazamentos de gás, inundações e entupimentos — com deslocamento rápido e contenção imediata.',
        bullets: [
          'Linha direta disponível todos os dias',
          'Contenção de vazamentos e inundações',
          'Isolamento de segurança da rede',
          'Relatório para seguradora',
        ],
      },
      avaliacao: {
        title: 'Avaliação preventiva',
        summary:
          'Vistoria completa da sua instalação com relatório de riscos priorizados e orçamento das correções necessárias.',
        bullets: [
          'Visita técnica gratuita',
          'Relatório de riscos priorizado',
          'Orçamento detalhado por etapa',
          'Plano de manutenção anual',
        ],
      },
    },
    cta: 'Pedir orçamento deste serviço',
    all: 'Solicitar avaliação completa',
  },
  process: {
    eyebrow: 'Como trabalhamos',
    title: 'Quatro passos, nenhuma surpresa',
    subtitle: 'Um processo simples que mantém você informado do primeiro contato à entrega da obra.',
    steps: [
      { title: 'Contato e diagnóstico', text: 'Você fala conosco por WhatsApp ou formulário e agendamos a visita técnica.' },
      { title: 'Orçamento detalhado', text: 'Recebe um orçamento discriminado por material e mão de obra, com prazo definido.' },
      { title: 'Execução acompanhada', text: 'Equipe identificada, obra protegida e responsável direto disponível para você.' },
      { title: 'Entrega e garantia', text: 'Vistoria final, limpeza, relatório com fotos e garantia por escrito.' },
    ],
  },
  differentials: {
    eyebrow: 'Diferenciais',
    title: 'Por que os clientes escolhem a Falcão',
    subtitle:
      'Mais de 17 anos de obra ensinaram que o que fideliza não é o preço — é a previsibilidade.',
    items: {
      certificacao: {
        title: 'Certificação e conformidade',
        text: 'Técnicos com certificação válida e trabalhos executados segundo as normas europeias de gás e instalações.',
      },
      equipa: {
        title: 'Equipe própria e uniformizada',
        text: 'Profissionais fixos, identificados e treinados. Você sabe exatamente quem entra na sua casa.',
      },
      prazos: {
        title: 'Prazos cumpridos',
        text: 'Cronograma por etapa com acompanhamento diário e comunicação proativa sobre qualquer ajuste.',
      },
      garantia: {
        title: 'Garantia por escrito',
        text: 'Até 5 anos nas instalações e 2 anos nos acabamentos. Assistência rápida e sem discussão.',
      },
      orcamento: {
        title: 'Orçamento transparente',
        text: 'Preço fechado, discriminado por item. Sem custos escondidos nem surpresas no final da obra.',
      },
      limpeza: {
        title: 'Obra limpa e organizada',
        text: 'Proteção total de pisos e móveis, remoção de resíduos e limpeza final incluída no serviço.',
      },
    },
  },
  testimonials: {
    eyebrow: 'Depoimentos',
    title: 'Quem já confiou na Falcão Obras',
    subtitle: 'Avaliações reais de clientes residenciais, condomínios e comércios atendidos nos últimos anos.',
    items: {
      joana: {
        name: 'Joana Meireles',
        role: 'Proprietária · Apartamento na Charneca da Caparica',
        quote:
          'Trocaram toda a tubulação de água do meu apartamento em três dias, com proteção de piso e limpeza no final. O orçamento foi exatamente o que pagamos.',
      },
      miguel: {
        name: 'Miguel Andrade',
        role: 'Síndico · Condomínio Vista Verde',
        quote:
          'Temos contrato de manutenção há quatro anos. Resolvem desde uma fuga no gás até pintura das áreas comuns, sempre com relatório e fatura organizada.',
      },
      helena: {
        name: 'Helena Prado',
        role: 'Proprietária · Restaurante Maré',
        quote:
          'Tivemos um entupimento sério numa sexta à noite e a equipe chegou em menos de uma hora. A câmera de inspeção mostrou o problema e resolveram na hora.',
      },
      tiago: {
        name: 'Tiago Ferreira',
        role: 'Cliente residencial · Almada',
        quote:
          'Remodelaram a cozinha e o banheiro por completo. Prazos cumpridos, comunicação clara no WhatsApp e acabamento impecável na pintura.',
      },
    },
    ratingLabel: 'avaliação média',
    reviewsLabel: 'avaliações verificadas',
    prev: 'Depoimento anterior',
    next: 'Próximo depoimento',
    goTo: 'Ir para o depoimento',
  },
  team: {
    eyebrow: 'Equipe',
    title: 'Gente que assina o próprio trabalho',
    subtitle:
      'Uma equipe enxuta, experiente e estável — as mesmas pessoas que começam a obra são as que entregam.',
    items: {
      olavo: {
        name: 'Olavo Pereira',
        role: 'Fundador e responsável técnico',
        bio: 'Fundou a Falcão em 2009 e assina pessoalmente cada orçamento e a vistoria final. Mais de 17 anos em instalações de gás e redes de fluidos.',
      },
      luisa: {
        name: 'Dra. Luisa Pinto',
        role: 'Gestora de obra e engenheira',
        bio: 'Engenheira responsável pelo planejamento e pelo controle técnico das obras. Elabora o projeto e o cronograma por etapa, define especificações e materiais, articula fornecedores, faz o controle de custos e qualidade e valida cada fase executada antes de liberar a seguinte.',
      },
      'olavo-junior': {
        name: 'Olavo Junior',
        role: 'Responsável de acabamentos e atendimento ao cliente',
        bio: 'É ele que mantém o cliente a par da obra, com atualizações regulares do andamento, fotos e próximos passos. Supervisiona também as pinturas, os revestimentos e os detalhes finais que definem a percepção de qualidade da entrega.',
      },
      ricardo: {
        name: 'Ricardo Conceição',
        role: 'Técnico certificador de gás',
        bio: 'Não executa as obras: é ele que certifica. Faz o teste final de estanqueidade das instalações e reparações de gás executadas pela equipe e emite o termo de responsabilidade.',
        certifies: 'Certifica apenas as obras de gás',
        responsibility: 'Teste final de estanqueidade e termo de responsabilidade',
      },
    },
  },
  location: {
    eyebrow: 'Localização',
    title: 'Onde estamos e onde atendemos',
    subtitle:
      'Base operacional na Charneca da Caparica, com deslocação para toda a margem sul e a região de Lisboa.',
    addressLabel: 'Endereço',
    hoursLabel: 'Horário de atendimento',
    phoneLabel: 'Telefones',
    coverageLabel: 'Zonas atendidas',
    coverage: [
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
    ],
    travelTitle: 'Taxa de deslocação',
    travelNote:
      'Valor fixo por visita técnica, já incluído no orçamento — nunca é cobrado um extra depois da aprovação. Fora destas zonas, consulte-nos.',
    travelFees: [
      { region: 'Lisboa e região', fee: '45 €' },
      { region: 'Setúbal', fee: '35 €' },
    ],
    directions: 'Abrir no Google Maps',
    mapTitle: 'Mapa com a localização da Falcão Obras & Remodelações',
    weekdays: 'Segunda a Sexta',
    saturday: 'Sábado',
    sunday: 'Domingo',
  },
  faq: {
    eyebrow: 'Perguntas frequentes',
    title: 'Dúvidas que quase todos têm antes de começar',
    subtitle: 'Se a sua pergunta não estiver aqui, fale conosco — respondemos em poucas horas.',
    items: {
      orcamento: {
        question: 'A visita e o orçamento têm algum custo?',
        answer:
          'O orçamento é sempre gratuito. A visita técnica tem uma taxa fixa de deslocação: 45 € para Lisboa e região e 35 € para Setúbal, já incluída no orçamento e descontada do valor final caso o serviço seja aprovado.',
      },
      prazos: {
        question: 'Quanto tempo leva uma obra de remodelação?',
        answer:
          'Depende do escopo. Uma pintura completa de apartamento T2 leva de 3 a 5 dias; uma cozinha ou banheiro completo entre 10 e 18 dias; uma remodelação integral entre 4 e 10 semanas. Você recebe um cronograma por etapa antes do início dos trabalhos.',
      },
      certificado: {
        question: 'Vocês emitem certificado de instalação de gás?',
        answer:
          'Sim. Executamos a instalação conforme as normas técnicas aplicáveis e emitimos o certificado e a documentação necessária para a vistoria. Também regularizamos instalações antigas que não possuem certificação.',
      },
      garantia: {
        question: 'Qual é a garantia oferecida nos serviços?',
        answer:
          'Oferecemos até 5 anos de garantia nas instalações técnicas (gás, águas e esgotos) e 2 anos nos acabamentos, como pinturas e revestimentos. A garantia é entregue por escrito com o relatório final da obra.',
      },
      deslocacao: {
        question: 'Atendem fora da cidade? Cobram deslocação?',
        answer:
          'Atendemos toda a margem sul e a região de Lisboa, com base na Charneca da Caparica. A taxa de deslocação é fixa: 45 € para Lisboa e região e 35 € para Setúbal. O valor já consta no orçamento — nunca é cobrado um extra depois da aprovação.',
      },
      pagamento: {
        question: 'Quais são as formas de pagamento?',
        answer:
          'Trabalhamos com transferência bancária, MB Way e dinheiro. Para obras maiores, o pagamento é dividido em etapas: sinal na aprovação, parcelas conforme o cronograma e o restante na vistoria final.',
      },
      urgencia: {
        question: 'Como funciona o atendimento de emergência?',
        answer:
          'Existe uma linha direta de urgência disponível todos os dias para vazamentos de gás, inundações e entupimentos graves. A prioridade é sempre conter o problema; o orçamento detalhado é apresentado logo depois, já com a situação estabilizada.',
      },
      'certificacao-independente': {
        question: 'Quem certifica as obras de gás depois de prontas?',
        answer:
          'A certificação é feita por um técnico próprio e independente da execução: quem instala não é quem assina o termo de responsabilidade. O nosso técnico certificador, Ricardo Conceição, faz o teste final de estanqueidade apenas das obras de gás e emite o termo de responsabilidade — uma verificação isenta, feita dentro de casa, antes de entregarmos a instalação.',      },
    },
    stillDoubts: 'Ainda tem dúvidas?',
    talkNow: 'Falar com um especialista',
  },
  contact: {
    eyebrow: 'Contato',
    title: 'Peça o seu orçamento gratuito',
    subtitle:
      'Preencha os dados abaixo e retornamos com um orçamento detalhado. Se preferir resolver agora, chame direto no WhatsApp.',
    form: {
      name: 'Nome completo',
      namePlaceholder: 'Como podemos chamá-lo?',
      phone: 'Telefone',
      phonePlaceholder: '(11) 90000-0000',
      email: 'E-mail',
      emailPlaceholder: 'voce@email.com',
      treatment: 'Serviço desejado',
      treatmentPlaceholder: 'Selecione uma opção',
      message: 'Mensagem',
      messagePlaceholder: 'Descreva o serviço, o local e o prazo desejado...',
      submit: 'Enviar pedido de orçamento',
      sending: 'Enviando...',
      consent: 'Ao enviar, você concorda em ser contatado por telefone, e-mail ou WhatsApp para receber o orçamento.',
      required: 'obrigatório',
      optional: 'opcional',
      successTitle: 'Pedido enviado com sucesso!',
      successText:
        'Recebemos as suas informações e vamos responder em até 24 horas úteis. Se for urgente, chame no WhatsApp.',
      successAgain: 'Enviar outro pedido',
      errorTitle: 'Não foi possível enviar',
      errorText: 'Verifique os campos destacados e tente novamente. Se preferir, fale conosco pelo WhatsApp.',
      errors: {
        name: 'Informe o seu nome completo (mínimo 3 caracteres).',
        phone: 'Informe um telefone válido com DDD, apenas números.',
        email: 'Informe um e-mail válido, por exemplo: nome@email.com.',
        treatment: 'Selecione o serviço que você precisa.',
        message: 'Descreva brevemente o serviço (mínimo 10 caracteres).',
      },
    },
    infoTitle: 'Fale conosco agora',
    infoText: 'Atendimento humano de segunda a sábado. Emergências todos os dias.',
    whatsappTitle: 'Orçamento pelo WhatsApp',
    whatsappText: 'Resposta rápida, envio de fotos e agendamento na mesma conversa.',
    callNow: 'Ligar agora',
    emailTitle: 'Por e-mail',
    responseTime: 'Resposta em até 24 horas úteis',
  },
  cta: {
    title: 'Vamos começar a sua obra?',
    subtitle:
      'Conte o que você precisa e receba um orçamento detalhado, com prazo e garantia por escrito. A primeira avaliação é gratuita.',
    primary: 'Agendar orçamento',
    secondary: 'Falar no WhatsApp',
  },
  footer: {
    about:
      'Instalações de gás, águas e esgotos, remodelações gerais e pinturas com equipe própria, certificação técnica e garantia por escrito.',
    quickLinks: 'Navegação',
    servicesTitle: 'Serviços',
    contactTitle: 'Contato',
    rights: 'Todos os direitos reservados.',
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    madeWith: 'Obra executada com rigor técnico e acabamento profissional.',
    backToTop: 'Voltar ao topo',
  },
  whatsappFloat: {
    label: 'Falar no WhatsApp',
    tooltip: 'Precisa de ajuda? Fale conosco',
  },
};

export const en: Dictionary = {
  meta: {
    title: 'Falcão Construction & Renovations | Gas, Water, Drainage and Painting',
    description:
      'Specialists in gas installations, water and drainage systems, full renovations and painting. Certified technicians, transparent quotes and written warranty. Request your free estimate.',
    keywords: [
      'gas company',
      'gas installation',
      'water and drainage',
      'home renovation',
      'painting services',
      'construction quote',
      'certified technician',
      'Falcão Construction',
    ],
  },
  nav: {
    inicio: 'Home',
    sobre: 'About',
    servicos: 'Services',
    diferenciais: 'Why us',
    depoimentos: 'Reviews',
    equipa: 'Team',
    localizacao: 'Location',
    faq: 'FAQ',
    contacto: 'Contact',
    orcamento: 'Book an estimate',
    menu: 'Menu',
    close: 'Close',
    openMenu: 'Open menu',
    language: 'Language',
    switchTo: 'Mudar para Português',
  },
  hero: {
    badge: 'Certified technicians · Response within 24h',
    title: 'Take care of your home with',
    titleHighlight: 'technology, comfort and confidence',
    subtitle:
      'Gas, water and drainage, full renovations and painting with professional finishing. One single team for your entire project — from diagnosis to handover, on schedule and with no surprise costs.',
    ctaPrimary: 'Book an estimate',
    ctaSecondary: 'Chat on WhatsApp',
    trust: 'Over 2,400 completed projects with an average rating of 4.9 stars.',
    scroll: 'See services',
    cardTitle: 'Hawk eye, craftsman hands',
    cardText:
      'We inspect every detail before we start. That is how we avoid rework and deliver a clean job on the very first visit.',
    stats: [
      { value: '17+', label: 'years of experience' },
      { value: '2,400+', label: 'projects delivered' },
      { value: '4.9★', label: 'customer rating' },
      { value: '24h', label: 'emergency response' },
    ],
  },
  about: {
    eyebrow: 'About the company',
    title: 'A complete team to take care of your whole home',
    lead:
      'Falcão Construction & Renovations started in 2009 with a simple idea: bringing together in one team every service a home needs, so clients never have to coordinate five different companies.',
    body: [
      'We began with gas installations and grew alongside our clients. Today we handle everything from replacing a water heater to full renovations, always with a technical plan, quality materials and a dedicated site manager.',
      'We work with leak detection equipment, pipe inspection cameras and documented pressure tests. Every job ends with a report, photos and a written warranty — because trust is proven through transparency.',
    ],
    highlights: [
      {
        title: 'In-house certified team',
        text: 'No service is outsourced. The technicians who arrive at your home are our own employees and always identified.',
      },
      {
        title: 'Technical diagnosis first',
        text: 'We assess, measure and explain the problem before quoting any price. No guesswork.',
      },
      {
        title: 'Clean, organised worksite',
        text: 'Floor protection, waste removal and final cleaning included in every single job.',
      },
      {
        title: 'Written warranty',
        text: 'Up to 5 years on installations and 2 years on finishes, with straightforward after-sales support.',
      },
    ],
    signature: 'The Falcão Construction & Renovations team',
    badgeYears: '17',
    badgeYearsLabel: 'years building',
  },
  services: {
    eyebrow: 'Services',
    title: 'Everything your home needs, in one place',
    subtitle:
      'From technical installation to the final finish: eight work fronts delivered by the same team, to a single quality standard.',
    items: {
      gas: {
        title: 'Gas installations',
        summary:
          'Design, installation, conversion and maintenance of natural gas and LPG networks, with certification and pressure testing.',
        bullets: [
          'Water heaters, boilers and hobs',
          'Electronic leak detection',
          'Installation certificate and inspection',
          'LPG to natural gas conversion',
          'Final test and statement of responsibility issued by a technician independent from the execution',
        ],
      },
      aguas: {
        title: 'Water and drainage',
        summary:
          'Hot and cold water networks, drainage and sewage systems, old pipe replacement and leak repairs.',
        bullets: [
          'Leak detection without breaking walls',
          'Lead and iron pipe replacement',
          'Inspection chambers and sewage connections',
          'Documented pressure tests',
        ],
      },
      remodelacao: {
        title: 'Full renovation',
        summary:
          'Complete renovation of apartments, houses and shops with project management, design and staged execution.',
        bullets: [
          'Complete kitchens and bathrooms',
          'Masonry, flooring and tiling',
          'Integrated electrical and lighting',
          'Schedule and supplier management',
        ],
      },
      pintura: {
        title: 'Painting',
        summary:
          'Interior and exterior painting, textures, decorative finishes and façade treatment with professional surface preparation.',
        bullets: [
          'Surface preparation and fine filler',
          'Façade painting and waterproofing',
          'Decorative effects and microcement',
          'Low-odour, low-emission paints',
        ],
      },
      esgotos: {
        title: 'Drain cleaning and sewage',
        summary:
          'Technical pipe cleaning, drain unblocking and preventive maintenance of sewage networks.',
        bullets: [
          'Camera inspection',
          'High-pressure drain cleaning',
          'Septic tank and grease trap cleaning',
          'Scheduled preventive maintenance',
        ],
      },
      manutencao: {
        title: 'Preventive maintenance',
        summary:
          'Periodic maintenance plans for homes, condominiums and businesses, with a technical report on every visit.',
        bullets: [
          'Gas and water system check-ups',
          'Contracts for condominiums',
          'Checklist with photographs',
          'Priority on emergencies',
        ],
      },
      emergencia: {
        title: '24-hour emergency',
        summary:
          'Urgent response for gas leaks, flooding and blockages — fast dispatch and immediate containment.',
        bullets: [
          'Direct line available every day',
          'Leak and flood containment',
          'Safety isolation of the network',
          'Report for your insurance company',
        ],
      },
      avaliacao: {
        title: 'Preventive assessment',
        summary:
          'Full inspection of your installation with a prioritised risk report and a quote for the necessary corrections.',
        bullets: [
          'Free technical visit',
          'Prioritised risk report',
          'Detailed stage-by-stage quote',
          'Annual maintenance plan',
        ],
      },
    },
    cta: 'Request a quote for this service',
    all: 'Request a full assessment',
  },
  process: {
    eyebrow: 'How we work',
    title: 'Four steps, no surprises',
    subtitle: 'A simple process that keeps you informed from first contact to project handover.',
    steps: [
      { title: 'Contact and diagnosis', text: 'You reach us on WhatsApp or through the form, and we schedule the technical visit.' },
      { title: 'Detailed estimate', text: 'You receive an itemised quote for materials and labour, with a defined deadline.' },
      { title: 'Supervised execution', text: 'Identified team, protected worksite and a direct manager available to you.' },
      { title: 'Handover and warranty', text: 'Final inspection, cleaning, photo report and written warranty.' },
    ],
  },
  differentials: {
    eyebrow: 'Why us',
    title: 'Why clients choose Falcão',
    subtitle:
      'More than 17 years on site taught us that loyalty is not won by price — it is won by predictability.',
    items: {
      certificacao: {
        title: 'Certification and compliance',
        text: 'Technicians with valid certification and work carried out to European gas and installation standards.',
      },
      equipa: {
        title: 'In-house uniformed team',
        text: 'Permanent, identified and trained professionals. You know exactly who enters your home.',
      },
      prazos: {
        title: 'Deadlines met',
        text: 'Stage-by-stage schedule with daily tracking and proactive communication about any adjustment.',
      },
      garantia: {
        title: 'Written warranty',
        text: 'Up to 5 years on installations and 2 years on finishes. Fast support, no arguments.',
      },
      orcamento: {
        title: 'Transparent pricing',
        text: 'Fixed price, itemised line by line. No hidden costs and no surprises at the end.',
      },
      limpeza: {
        title: 'Clean, tidy worksite',
        text: 'Full protection of floors and furniture, waste removal and final cleaning included.',
      },
    },
  },
  testimonials: {
    eyebrow: 'Reviews',
    title: 'Clients who trusted Falcão Obras',
    subtitle: 'Verified reviews from residential clients, condominiums and businesses served in recent years.',
    items: {
      joana: {
        name: 'Joana Meireles',
        role: 'Homeowner · Apartment in Charneca da Caparica',
        quote:
          'They replaced all the water pipes in my apartment in three days, with floor protection and cleaning at the end. The quote was exactly what we paid.',
      },
      miguel: {
        name: 'Miguel Andrade',
        role: 'Building manager · Vista Verde Condominium',
        quote:
          'We have had a maintenance contract for four years. They handle everything from a gas leak to painting the common areas, always with a report and proper invoicing.',
      },
      helena: {
        name: 'Helena Prado',
        role: 'Owner · Maré Restaurant',
        quote:
          'We had a serious blockage on a Friday night and the team arrived in under an hour. The inspection camera showed the problem and they fixed it on the spot.',
      },
      tiago: {
        name: 'Tiago Ferreira',
        role: 'Residential client · Almada',
        quote:
          'They fully renovated the kitchen and bathroom. Deadlines met, clear communication on WhatsApp and flawless painting finish.',
      },
    },
    ratingLabel: 'average rating',
    reviewsLabel: 'verified reviews',
    prev: 'Previous review',
    next: 'Next review',
    goTo: 'Go to review',
  },
  team: {
    eyebrow: 'Team',
    title: 'People who sign their own work',
    subtitle:
      'A lean, experienced and stable team — the same people who start the job are the ones who deliver it.',
    items: {
      olavo: {
        name: 'Olavo Pereira',
        role: 'Founder and technical lead',
        bio: 'Founded Falcão in 2009 and personally signs off every estimate and final inspection. Over 17 years in gas installations and fluid networks.',
      },
      luisa: {
        name: 'Dr. Luisa Pinto',
        role: 'Site manager and engineer',
        bio: 'Engineer responsible for project planning and technical control. She draws up the design and the stage-by-stage schedule, defines specifications and materials, coordinates suppliers, manages cost and quality control, and signs off each completed phase before the next one starts.',
      },
      'olavo-junior': {
        name: 'Olavo Junior',
        role: 'Finishing and client care supervisor',
        bio: 'He is the one who keeps you informed about the project, with regular updates on progress, photos and next steps. He also oversees painting, tiling and the final details that define how the quality of the handover is perceived.',
      },
      ricardo: {
        name: 'Ricardo Conceição',
        role: 'Gas certification technician',
        bio: 'He does not carry out the works: he certifies them. He performs the final tightness test on the gas installations and repairs delivered by the team and issues the statement of responsibility.',
        certifies: 'Certifies gas works only',
        responsibility: 'Final tightness test and statement of responsibility',
      },
    },
  },
  location: {
    eyebrow: 'Location',
    title: 'Where we are and where we work',
    subtitle:
      'Operational base in Charneca da Caparica, serving the whole south bank and the Lisbon region.',
    addressLabel: 'Address',
    hoursLabel: 'Opening hours',
    phoneLabel: 'Phone numbers',
    coverageLabel: 'Areas served',
    coverage: [
      'Charneca da Caparica',
      'Costa da Caparica',
      'Almada',
      'Lisbon',
      'Setúbal',
      'Sesimbra',
      'Palmela',
      'Barreiro',
      'Montijo',
      'Sintra',
      'Cascais',
      'Oeiras',
    ],
    travelTitle: 'Travel fee',
    travelNote:
      'Fixed amount per technical visit, already included in the estimate — never charged as an extra after approval. Outside these areas, please ask us.',
    travelFees: [
      { region: 'Lisbon and region', fee: '€45' },
      { region: 'Setúbal', fee: '€35' },
    ],
    directions: 'Open in Google Maps',
    mapTitle: 'Map showing the location of Falcão Construction & Renovations',
    weekdays: 'Monday to Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
  },
  faq: {
    eyebrow: 'Frequently asked questions',
    title: 'Questions almost everyone asks before starting',
    subtitle: 'If your question is not here, get in touch — we usually reply within a few hours.',
    items: {
      orcamento: {
        question: 'Do the visit and the estimate cost anything?',
        answer:
          'The estimate is always free. The technical visit has a fixed travel fee: €45 for Lisbon and the surrounding region and €35 for Setúbal, already included in the estimate and deducted from the final amount if you approve the work.',
      },
      prazos: {
        question: 'How long does a renovation take?',
        answer:
          'It depends on scope. A full repaint of a two-bedroom apartment takes 3 to 5 days; a complete kitchen or bathroom 10 to 18 days; a full renovation 4 to 10 weeks. You receive a stage-by-stage schedule before work begins.',
      },
      certificado: {
        question: 'Do you issue a gas installation certificate?',
        answer:
          'Yes. We install to the applicable technical standards and issue the certificate and documentation required for inspection. We also legalise older installations that have no certification.',
      },
      garantia: {
        question: 'What warranty do you offer?',
        answer:
          'We offer up to 5 years on technical installations (gas, water and drainage) and 2 years on finishes such as painting and tiling. The warranty is delivered in writing with the final project report.',
      },
      deslocacao: {
        question: 'Do you work outside the city? Is travel charged?',
        answer:
          'We cover the whole south bank and the Lisbon region, based in Charneca da Caparica. The travel fee is fixed: €45 for Lisbon and the surrounding region and €35 for Setúbal. It is already stated in the estimate — never added as an extra after approval.',
      },
      pagamento: {
        question: 'Which payment methods do you accept?',
        answer:
          'Bank transfer, MB Way and cash. For larger projects, payment is split by stage: a deposit on approval, instalments along the schedule, and the balance at the final inspection.',
      },
      urgencia: {
        question: 'How does the emergency service work?',
        answer:
          'A direct emergency line is available every day for gas leaks, flooding and serious blockages. The priority is always to contain the problem; the detailed estimate follows once the situation is stable.',
      },
      'certificacao-independente': {
        question: 'Who certifies the gas works once they are finished?',
        answer:
          'Certification is carried out by our own technician, independent from the execution: the person who installs is not the one who signs the statement of responsibility. Our certification technician, Ricardo Conceição, performs the final tightness test on gas works only and issues the statement of responsibility — an impartial check, done in-house, before we hand over the installation.',
      },
    },
    stillDoubts: 'Still have questions?',
    talkNow: 'Talk to a specialist',
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Request your free estimate',
    subtitle:
      'Fill in the details below and we will come back with a detailed estimate. If you prefer to solve it now, message us on WhatsApp.',
    form: {
      name: 'Full name',
      namePlaceholder: 'What should we call you?',
      phone: 'Phone',
      phonePlaceholder: '(11) 90000-0000',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      treatment: 'Service needed',
      treatmentPlaceholder: 'Select an option',
      message: 'Message',
      messagePlaceholder: 'Describe the service, the location and your preferred timeline...',
      submit: 'Send estimate request',
      sending: 'Sending...',
      consent: 'By submitting, you agree to be contacted by phone, email or WhatsApp to receive your estimate.',
      required: 'required',
      optional: 'optional',
      successTitle: 'Request sent successfully!',
      successText:
        'We received your information and will reply within 24 business hours. If it is urgent, message us on WhatsApp.',
      successAgain: 'Send another request',
      errorTitle: 'We could not send it',
      errorText: 'Check the highlighted fields and try again. If you prefer, reach us on WhatsApp.',
      errors: {
        name: 'Please enter your full name (at least 3 characters).',
        phone: 'Please enter a valid phone number, digits only.',
        email: 'Please enter a valid email, for example: name@email.com.',
        treatment: 'Please select the service you need.',
        message: 'Please briefly describe the service (at least 10 characters).',
      },
    },
    infoTitle: 'Talk to us now',
    infoText: 'Human support from Monday to Saturday. Emergencies every day.',
    whatsappTitle: 'Estimate via WhatsApp',
    whatsappText: 'Fast replies, photo sharing and scheduling in the same conversation.',
    callNow: 'Call now',
    emailTitle: 'By email',
    responseTime: 'Reply within 24 business hours',
  },
  cta: {
    title: 'Shall we start your project?',
    subtitle:
      'Tell us what you need and receive a detailed estimate, with a deadline and a written warranty. The first assessment is free.',
    primary: 'Book an estimate',
    secondary: 'Chat on WhatsApp',
  },
  footer: {
    about:
      'Gas, water and drainage installations, full renovations and painting with an in-house team, technical certification and written warranty.',
    quickLinks: 'Navigation',
    servicesTitle: 'Services',
    contactTitle: 'Contact',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    madeWith: 'Work delivered with technical rigour and professional finishing.',
    backToTop: 'Back to top',
  },
  whatsappFloat: {
    label: 'Chat on WhatsApp',
    tooltip: 'Need help? Talk to us',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en };
