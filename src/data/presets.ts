import { SiteContent, DiagnosticAnswer } from '../types';

export const SITE_PRESETS: Record<string, SiteContent> = {
  'creative-studio': {
    presetId: 'creative-studio',
    brandName: 'Vértice Atelier',
    badgeKicker: 'Arquitetura de Espaços e Identidade de Marca',
    heroHeadline: 'Projetamos espaços e marcas memoráveis para negócios visionários',
    heroSubheadline: 'Estúdio independente focado em arquitetura comercial, design de interiores corporativos e experiências visuais que elevam o valor de mercado de marcas contemporâneas.',
    primaryCtaText: 'Agendar Reunião de Diagnóstico',
    secondaryCtaText: 'Ver Portfólio de Obras',
    heroImage: '/src/assets/images/hero_creative_studio_1794394546479.jpg',
    accentColor: 'indigo',
    contactEmail: 'projetos@verticeatelier.com.br',
    contactPhone: '+55 (11) 98452-3310',
    address: 'Av. Brigadeiro Faria Lima, 3477 — Itaim Bibi, São Paulo - SP',
    metrics: [
      { value: '140+', label: 'Projetos Entregues', context: 'Em 6 estados brasileiros' },
      { value: '38%', label: 'Valorização Média', context: 'No valor locatício de espaços reformados' },
      { value: '12', label: 'Prêmios de Design', context: 'Reconhecimento nacional e ibérico' },
      { value: '98%', label: 'No Prazo Contratual', context: 'Com cronograma físico-financeiro rigoroso' }
    ],
    services: [
      {
        id: 's1',
        number: '01',
        title: 'Arquitetura Comercial & Varejo',
        description: 'Concepção completa de lojas conceito, showrooms e restaurantes pensados para maximizar o fluxo de clientes e o ticket médio.',
        deliverable: 'Caderno executivo, maquete 3D bim e acompanhamento técnico de obra.'
      },
      {
        id: 's2',
        number: '02',
        title: 'Sedes Corporativas & Coworking',
        description: 'Planejamento espacial ergonômico e acústico para empresas de tecnologia e consultorias que buscam atrair e reter talentos.',
        deliverable: 'Layout funcional, especificação mobiliária e manual de ambientação.'
      },
      {
        id: 's3',
        number: '03',
        title: 'Design de Sinalização & Experiência',
        description: 'Sistemas visuais e wayfinding que guiam o visitante de forma intuitiva, reforçando a assinatura da marca em cada detalhe.',
        deliverable: 'Manual de identidade espacial e prototipagem física de materiais.'
      }
    ],
    portfolio: [
      {
        id: 'p1',
        title: 'Sede Hub FinTech Paulista',
        category: 'Corporativo',
        result: '+45% retenção de equipe em 12 meses',
        year: '2025',
        summary: 'Espaço de 1.800m² integrando salas de foco acústico, arena de eventos para 120 pessoas e áreas de descompressão biofílicas.',
        tags: ['Acústica', 'Design Biofílico', 'BIM']
      },
      {
        id: 'p2',
        title: 'Flagship Store Botanika Cosméticos',
        category: 'Varejo',
        result: '+62% no tempo de permanência em loja',
        year: '2025',
        summary: 'Arquitetura sensorial em mármore travertino e madeira freijó certificada, unindo iluminação difusa a bancadas de experimentação.',
        tags: ['Retail Design', 'Iluminação', 'Mobiliário Autoral']
      },
      {
        id: 'p3',
        title: 'Restaurante & Bar Terroir',
        category: 'Gastronomia',
        result: 'Lotação máxima desde a semana inaugural',
        year: '2024',
        summary: 'Reabilitação de casarão histórico dos anos 1940 no Jardim Paulista, com cozinha aberta e adega climatizada em aço corten.',
        tags: ['Patrimônio', 'Hospitality', 'Cozinha Aberta']
      }
    ],
    testimonials: [
      {
        id: 't1',
        quote: 'A Vértice transformou a percepção da nossa marca. O novo espaço corporativo dobrou nosso índice de atração de engenheiros seniores e virou nosso principal cartão de visitas.',
        author: 'Guilherme Sampaio',
        role: 'Diretor de Operações',
        company: 'Nexus Cloud Brasil',
        impactMetric: '+45% retenção de talentos'
      },
      {
        id: 't2',
        quote: 'Cumpriram rigorosamente o prazo de 90 dias antes da data do nosso lançamento oficial. A loja conceito vendeu 180% da meta já no primeiro trimestre.',
        author: 'Mariana Drummond',
        role: 'Fundadora e CEO',
        company: 'Botanika Cosméticos',
        impactMetric: '180% da meta de vendas'
      }
    ],
    pricing: [
      {
        id: 'plan-1',
        name: 'Consultoria de Viabilidade Espacial',
        tagline: 'Para quem busca validação técnica e layout antes de locar ou comprar um imóvel.',
        monthlyPrice: 'R$ 6.800',
        annualPrice: 'R$ 6.800 / projeto pontual',
        features: [
          'Visita técnica in loco com arquiteto líder',
          'Estudo de fluxo e zoneamento preliminar',
          'Relatório de conformidade predial e bombeiros',
          'Estimativa orçamentária paramétrica de obra'
        ],
        ctaLabel: 'Solicitar Análise de Imóvel'
      },
      {
        id: 'plan-2',
        name: 'Projeto Executivo Turnkey',
        tagline: 'Solução integral do conceito à entrega das chaves com fiscalização técnica.',
        monthlyPrice: 'R$ 22.500',
        annualPrice: 'R$ 22.500 / sob medida',
        highlighted: true,
        features: [
          'Modelagem 3D fotorrealista e passeios virtuais',
          'Projetos complementares (elétrica, hidráulica, climatização)',
          'Caderno de concorrência com 3 orçamentos de empreiteiras',
          'Acompanhamento semanal e relatórios fotográficos'
        ],
        ctaLabel: 'Contratar Projeto Completo'
      }
    ],
    faqs: [
      {
        question: 'Qual é o prazo médio para o desenvolvimento de um projeto comercial?',
        answer: 'Nossos projetos de arquitetura comercial levam entre 45 e 75 dias para o caderno executivo completo. O cronograma de obras varia conforme a metragem e a complexidade estrutural, sendo detalhado na proposta inicial.'
      },
      {
        question: 'Vocês realizam o gerenciamento de obra ou apenas o projeto de arquitetura?',
        answer: 'Trabalhamos em dois modelos: o projeto executivo com fiscalização técnica periódica, ou a gestão turnkey completa onde coordenamos fornecedores, compras e prazos do início ao fim.'
      },
      {
        question: 'Atendem clientes fora da capital de São Paulo?',
        answer: 'Sim. Mantemos projetos em andamento em Curitiba, Rio de Janeiro, Belo Horizonte e Brasília, combinando visitas técnicas presenciais nas etapas críticas com alinhamentos semanais remotos.'
      }
    ]
  },

  'local-bistro': {
    presetId: 'local-bistro',
    brandName: 'Bistrô Figueira',
    badgeKicker: 'Cozinha de Origem e Vinhos Selecionados',
    heroHeadline: 'Ingredientes sazonais dos pequenos produtores preparados no fogo a lenha',
    heroSubheadline: 'Gastronomia autoral em ambiente acolhedor no coração da cidade. Menu degustação sazonal e carta com mais de 120 rótulos de vinhos naturais e biodinâmicos.',
    primaryCtaText: 'Reservar Mesa Online',
    secondaryCtaText: 'Ver Cardápio da Temporada',
    heroImage: '/src/assets/images/hero_bistro_gastronomy_1794394546433.jpg',
    accentColor: 'amber',
    contactEmail: 'reservas@bistrofigueira.com.br',
    contactPhone: '+55 (11) 3289-9941',
    address: 'Rua Bela Cintra, 1420 — Cerqueira César, São Paulo - SP',
    metrics: [
      { value: '4.9', label: 'Avaliação Média', context: 'Mais de 1.400 clientes no Google' },
      { value: '100%', label: 'Produtores Locais', context: 'Orgânicos num raio de até 150 km' },
      { value: '120', label: 'Rótulos Exclusivos', context: 'Curadoria de pequenos vinhedos' },
      { value: '8 anos', label: 'De Tradição', context: 'Servindo memórias à mesa' }
    ],
    services: [
      {
        id: 'b1',
        number: '01',
        title: 'Almoço Executivo de Terça a Sexta',
        description: 'Menu em três etapas que muda a cada quinzena, priorizando o frescor da colheita e rapidez no atendimento.',
        deliverable: 'Entrada, prato principal e sobremesa artesanal com café especial.'
      },
      {
        id: 'b2',
        number: '02',
        title: 'Jantar Degustação em 6 Tempos',
        description: 'Uma jornada sensorial conduzida pelo Chef, com opção de harmonização comentada por nossa sommelière.',
        deliverable: 'Experiência imersiva de 2h30 com vagas limitadas por noite.'
      },
      {
        id: 'b3',
        number: '03',
        title: 'Eventos Privados & Celebrações',
        description: 'Fechamento de salão ou mezanino privativo para comemorações íntimas, lançamentos corporativos e casamentos civis.',
        deliverable: 'Menu personalizado e equipe dedicada para até 45 convidados.'
      }
    ],
    portfolio: [
      {
        id: 'bp1',
        title: 'Menu da Terra — Outono/Inverno',
        category: 'Sazonal',
        result: 'Prato mais elogiado pelo Guia Comer & Beber',
        year: '2025',
        summary: 'Risoto de cogumelos selvagens da Mantiqueira com trufas brasileiras e emulsão de queijo da Canastra curado 18 meses.',
        tags: ['Fogo a Lenha', 'Queijos Artesanais', 'Mantiqueira']
      },
      {
        id: 'bp2',
        title: 'Cordeiro Confitado 14 Horas',
        category: 'Clássicos',
        result: 'Mais de 3.200 porções servidas',
        year: '2024',
        summary: 'Acompanhado de mousseline de mandioquinha tostada, glace de vinho do Porto e farofa de castanha-de-baru.',
        tags: ['Slow Cooking', 'Ingredientes Nativos']
      },
      {
        id: 'bp3',
        title: 'Adega de Vinhos Biodinâmicos',
        category: 'Curadoria',
        result: 'Eleita melhor carta intimista da região',
        year: '2025',
        summary: 'Seleção focada em produtores familiares do Rio Grande do Sul, Serra da Mantiqueira e pequenos terroirs chilenos.',
        tags: ['Vinhos Naturais', 'Sem Aditivos']
      }
    ],
    testimonials: [
      {
        id: 'bt1',
        quote: 'O Bistrô Figueira tem a combinação perfeita que falta a muitos restaurantes: comida com alma, atendimento atencioso sem ser formal demais e uma carta de vinhos impecável.',
        author: 'Arnaldo Lorenzi',
        role: 'Crítico de Gastronomia',
        company: 'Revista Paladar & Mesa',
        impactMetric: 'Nota máxima no Guia 2025'
      },
      {
        id: 'bt2',
        quote: 'Fizemos nosso jantar de comemoração de 10 anos de casamento e foi inesquecível. Cada etapa da harmonização surpreendeu todos os nossos amigos.',
        author: 'Camila & Rafael Barreto',
        role: 'Clientes Frequentes',
        company: 'São Paulo - SP',
        impactMetric: 'Experiência 5 estrelas'
      }
    ],
    pricing: [
      {
        id: 'b-plan-1',
        name: 'Almoço da Estação',
        tagline: 'Disponível de terça a sexta das 12h às 15h.',
        monthlyPrice: 'R$ 89',
        annualPrice: 'por pessoa',
        features: [
          'Entrada fresca do dia',
          'Opção de prato principal (carne, peixe ou vegetariano)',
          'Sobremesa autoral da pâtisserie',
          'Café especial coado na mesa'
        ],
        ctaLabel: 'Reservar Almoço'
      },
      {
        id: 'b-plan-2',
        name: 'Menu Confiance do Chef (6 Tempos)',
        tagline: 'A experiência máxima de terça a sábado no jantar.',
        monthlyPrice: 'R$ 290',
        annualPrice: 'por pessoa (+ R$ 160 harmonizado)',
        highlighted: true,
        features: [
          '6 etapas autorais com criações exclusivas',
          'Pães de fermentação natural de produção própria',
          'Harmonização opcional com vinhos selecionados',
          'Mesa com reserva prioritária garantida'
        ],
        ctaLabel: 'Garantir Reserva de Jantar'
      }
    ],
    faqs: [
      {
        question: 'É obrigatório fazer reserva ou atendem por ordem de chegada?',
        answer: 'Recomendamos fortemente a reserva prévia, principalmente para sextas e sábados à noite. Mantemos 20% das mesas para clientes sem reserva, sujeitas a fila de espera no lounge.'
      },
      {
        question: 'Possuem opções vegetarianas, veganas ou sem glúten?',
        answer: 'Sim, nosso cardápio conta sempre com opções dedicadas para vegetarianos e pessoas com restrições alimentares. Basta avisar a preferência no momento da reserva.'
      },
      {
        question: 'Cobram taxa de rolha caso eu queira levar meu próprio vinho?',
        answer: 'Sim, a taxa de rolha é de R$ 75 por garrafa (isentamos a primeira taxa para cada garrafa consumida de nossa própria carta).'
      }
    ]
  },

  'tech-consultancy': {
    presetId: 'tech-consultancy',
    brandName: 'Alva Digital Consulting',
    badgeKicker: 'Engenharia de Software e IA Aplicada a Negócios',
    heroHeadline: 'Desenvolvemos plataformas escaláveis e inteligência analítica para empresas líderes',
    heroSubheadline: 'Consultoria de engenharia de software especializada em modernização de sistemas legados, esteiras seguras de dados e automações inteligentes que geram eficiência operacional comprovada.',
    primaryCtaText: 'Falar com Especialista Técnico',
    secondaryCtaText: 'Conhecer Nossas Metodologias',
    heroImage: '/src/assets/images/hero_tech_consultancy_1794394546646.jpg',
    accentColor: 'emerald',
    contactEmail: 'contato@alvaconsulting.com.br',
    contactPhone: '+55 (11) 4003-8821',
    address: 'Av. Paulista, 1079, 14º andar — Bela Vista, São Paulo - SP',
    metrics: [
      { value: '45+', label: 'Engenheiros Sênior', context: '100% alocados em projetos estratégicos' },
      { value: '99.98%', label: 'Disponibilidade de SLA', context: 'Em sistemas de missão crítica em produção' },
      { value: 'R$ 14M+', label: 'Economia Gerada', context: 'Em custos de infraestrutura cloud e licenças' },
      { value: '3x', label: 'Aceleração de Deploy', context: 'Redução de tempo do commit à produção' }
    ],
    services: [
      {
        id: 'tc1',
        number: '01',
        title: 'Modernização de Sistemas Legados',
        description: 'Refatoração modular de monólitos antigos para micro-serviços resilientes com tolerância a falhas e zero downtime.',
        deliverable: 'Auditoria de código, plano de migração progressiva e migração orientada a eventos.'
      },
      {
        id: 'tc2',
        number: '02',
        title: 'Engenharia de Dados & Pipelines de IA',
        description: 'Construção de data lakes, governança de dados e esteiras de machine learning conectadas aos sistemas operacionais.',
        deliverable: 'Arquitetura de dados segura em nuvem e modelos customizados em produção.'
      },
      {
        id: 'tc3',
        number: '03',
        title: 'Squads Dedicados de Alta Performance',
        description: 'Times multidisciplinares ágeis (Tech Lead, Desenvolvedores, QA e Product Designer) integrados à sua equipe.',
        deliverable: 'Ciclos de entrega quinzenais, gestão por OKRs e documentação técnica viva.'
      }
    ],
    portfolio: [
      {
        id: 'tcp1',
        title: 'Core Bancário de Pagamentos Instantâneos',
        category: 'Fintech',
        result: '2.500 transações/segundo sem perdas',
        year: '2025',
        summary: 'Reestruturação completa da esteira de conciliação financeira para instituição de pagamentos com licença Bacen.',
        tags: ['Microsserviços', 'Kafka', 'Resiliência Bacen']
      },
      {
        id: 'tcp2',
        title: 'Plataforma Omnichannel de Logística',
        category: 'Supply Chain',
        result: '-38% no custo logístico de última milha',
        year: '2024',
        summary: 'Algoritmo de roteirização preditiva e rastreamento em tempo real para frota de 400 veículos de distribuição.',
        tags: ['Otimização', 'Cloud Native', 'APIs']
      },
      {
        id: 'tcp3',
        title: 'Motor de Recomendação Personalizada',
        category: 'E-commerce B2B',
        result: '+28% no valor médio dos pedidos',
        year: '2025',
        summary: 'Modelo preditivo de reposição automática de estoque para distribuidores industriais com 80 mil SKUs.',
        tags: ['Machine Learning', 'Python', 'PostgreSQL']
      }
    ],
    testimonials: [
      {
        id: 'tct1',
        quote: 'A Alva não apenas entregou a refatoração técnica no prazo acordado, mas treinou nossa equipe interna para sustentar a nova arquitetura sem qualquer sobressalto.',
        author: 'Roberto Funchal',
        role: 'VP de Tecnologia',
        company: 'Logix Logística Integrada',
        impactMetric: 'Zero incidentes críticos em 18 meses'
      },
      {
        id: 'tct2',
        quote: 'O time sênior da Alva operou como uma extensão natural da nossa liderança. Reduzimos o custo de nuvem em 35% logo no primeiro trimestre.',
        author: 'Beatriz Vasconcelos',
        role: 'Head de Engenharia',
        company: 'PayFlow Brasil',
        impactMetric: '35% de economia imediata em Cloud'
      }
    ],
    pricing: [
      {
        id: 'tc-plan-1',
        name: 'Technical Assessment & Diagnóstico',
        tagline: 'Imersão de 3 semanas para mapear gargalos, riscos de segurança e arquitetura.',
        monthlyPrice: 'R$ 18.000',
        annualPrice: 'investimento único',
        features: [
          'Varredura estática de segurança e débitos técnicos',
          'Mapeamento de gargalos de banco de dados e APIs',
          'Matriz de risco e plano de ação priorizado',
          'Apresentação executiva para a diretoria de TI'
        ],
        ctaLabel: 'Solicitar Assessment'
      },
      {
        id: 'tc-plan-2',
        name: 'Squad Dedicado de Engenharia',
        tagline: 'Time completo de desenvolvimento sênior acelerando seu roadmap de produto.',
        monthlyPrice: 'R$ 48.000',
        annualPrice: 'por sprint mensal (contrato flexível)',
        highlighted: true,
        features: [
          '1 Tech Lead + 2 Devs Full-Stack Sênior + 1 QA',
          'Reuniões diárias e entregas com testes automatizados',
          'Garantia de reposição de talentos sem custos',
          'Código 100% de propriedade do cliente desde o dia 1'
        ],
        ctaLabel: 'Contratar Squad Dedicado'
      }
    ],
    faqs: [
      {
        question: 'Qual o tempo necessário para iniciar um projeto ou alocar um squad?',
        answer: 'Para assessments técnicos, iniciamos em até 5 dias úteis. Para squads dedicados de engenharia, o prazo médio de mobilização e onboarding estruturado é de 10 a 15 dias.'
      },
      {
        question: 'Quem retém a propriedade intelectual do código e dos sistemas desenvolvidos?',
        answer: 'Todo o código-fonte, documentação, repositórios e artefatos de dados pertencem integralmente à sua empresa desde a primeira linha de código.'
      },
      {
        question: 'Como funciona o modelo de contratação e cancelamento?',
        answer: 'Trabalhamos com contratos mensais renováveis com aviso prévio simples de 30 dias, sem cláusulas abusivas de fidelidade forçada.'
      }
    ]
  }
};

export interface DiagnosticQuestion {
  id: string;
  pillar: string;
  number: string;
  title: string;
  question: string;
  explanation: string;
  options: {
    label: string;
    description: string;
    recommendedFor: string;
  }[];
  practicalTip: string;
}

export const DIAGNOSTIC_FRAMEWORK: DiagnosticQuestion[] = [
  {
    id: 'goal',
    pillar: '1. O Propósito Central',
    number: '01',
    title: 'Qual é o Objetivo Primário do Site?',
    question: 'Qual é a principal transformação ou resultado de negócio que o site precisa gerar agora?',
    explanation: 'Um site sem um objetivo único e prioritário tenta fazer tudo e acaba não convertendo ninguém. Definir se o foco é gerar contatos, vender diretamente ou construir autoridade dita toda a arquitetura de páginas.',
    options: [
      {
        label: 'Geração de Contatos & Orçamentos (Leads)',
        description: 'Captar nomes, telefones/WhatsApp e e-mails de clientes qualificados para fechar propostas de serviços.',
        recommendedFor: 'Consultorias, escritórios de arquitetura, advocacia, reformas, agências e prestadores de serviços.'
      },
      {
        label: 'Reservas & Agendamentos Locais',
        description: 'Facilitar a reserva de mesas, consultas ou horários presenciais com confirmação rápida e localização clara.',
        recommendedFor: 'Restaurantes, clínicas médicas, salões de beleza, estúdios de yoga e comércios de bairro.'
      },
      {
        label: 'Venda Direta / E-commerce',
        description: 'Apresentar catálogo de produtos físicos ou digitais com carrinho e checkout integrado para compra imediata.',
        recommendedFor: 'Lojas de vestuário, eletrônicos, marcas artesanais e produtos digitais.'
      },
      {
        label: 'Portfólio & Autoridade Profissional',
        description: 'Validar sua reputação, exibir grandes trabalhos concluídos e justificar preços mais altos no mercado.',
        recommendedFor: 'Designers, fotógrafos, palestrantes, engenheiros e profissionais autônomos de alto escalão.'
      }
    ],
    practicalTip: 'Dica de Ouro: Pergunte-se "Se o site só pudesse fazer uma coisa bem feita no próximo mês, qual traria mais retorno financeiro real?". Essa é a sua meta primária.'
  },
  {
    id: 'audience',
    pillar: '2. O Público-Alvo e Consciência',
    number: '02',
    title: 'Quem é o Cliente Ideal e em que Estágio ele Chega?',
    question: 'Quem toma a decisão de compra e qual é o nível de urgência e familiaridade dele com a sua solução?',
    explanation: 'Visitantes que já sabem exatamente o que querem precisam de um botão direto para comprar ou falar no WhatsApp. Visitantes que ainda estão pesquisando precisam primeiro de explicação clara e provas incontestáveis.',
    options: [
      {
        label: 'Cliente Pronto para Agir (Alta Intenção)',
        description: 'Já tem o problema claro e está procurando o melhor profissional para contratar hoje.',
        recommendedFor: 'Destaque no topo: telefone visível, botão WhatsApp fixo, prazos e garantia imediata.'
      },
      {
        label: 'Cliente Comparando Concorrentes (Média Intenção)',
        description: 'Pesquisou várias opções no Google/Instagram e quer entender os seus diferenciais reais.',
        recommendedFor: 'Destaque no topo: tabela comparativa, estudos de caso com métricas reais e selos de qualidade.'
      },
      {
        label: 'Cliente Corporativo / Comitê B2B (Decisão Complexa)',
        description: 'Gestores, diretores ou gerentes que precisam justificar o investimento para seus pares.',
        recommendedFor: 'Destaque no topo: conformidade técnica, segurança, SLA, clientes atendidos e cases corporativos.'
      },
      {
        label: 'Consumidor Final Local (Busca Conveniência)',
        description: 'Busca horário de funcionamento, fotos do ambiente, cardápio atualizado e rota no mapa.',
        recommendedFor: 'Destaque no topo: fotos reais, endereço, botão de reserva e botão de rota Waze/Maps.'
      }
    ],
    practicalTip: 'Dica de Ouro: Escreva para a pessoa real que assina o cheque ou passa o cartão, não para um público genérico "todos os interessados".'
  },
  {
    id: 'uvp',
    pillar: '3. Proposta Única de Valor',
    number: '03',
    title: 'Qual é a Promessa Central (UVP)?',
    question: 'Por que o cliente deve escolher a sua empresa e não o concorrente mais barato ou mais antigo?',
    explanation: 'A manchete principal do seu site deve responder em até 5 segundos: O que você faz? Para quem? E qual benefício concreto você garante?',
    options: [
      {
        label: 'Qualidade Excepcional & Acabamento Premium',
        description: 'Foco em estética refinada, materiais nobres e atenção obsessiva aos detalhes que ninguém mais tem.',
        recommendedFor: 'Marcas de luxo, arquitetos autorais, alta gastronomia e artesãos.'
      },
      {
        label: 'Velocidade & Pontualidade Rigorosa',
        description: 'Entrega no prazo garantido ou resposta imediata sem burocracia.',
        recommendedFor: 'Reformas, tecnologia sob demanda, consultorias e serviços urgentes.'
      },
      {
        label: 'Retorno sobre o Investimento (ROI Comprovado)',
        description: 'O serviço se paga rapidamente gerando mais receita ou cortando custos operacionais mensuráveis.',
        recommendedFor: 'Engenharia de software, marketing de performance e consultorias tributárias/financeiras.'
      },
      {
        label: 'Experiência Acolhedora & Atendimento Humano',
        description: 'Relacionamento direto com o especialista sem intermediários ou atendentes robóticos.',
        recommendedFor: 'Clínicas, consultores individuais e negócios locais tradicionais.'
      }
    ],
    practicalTip: 'Fórmula clássica de sucesso: "Ajudamos [Público] a conquistar [Resultado Desejado] com [Seu Diferencial], sem [Maior Dor ou Frustração típica do mercado]."'
  },
  {
    id: 'conversion',
    pillar: '4. A Ação de Conversão Primária',
    number: '04',
    title: 'Qual é o Próximo Passo Imediato (Call to Action)?',
    question: 'Quando o visitante decide seguir em frente, qual botão ou formulário ele deve encontrar em toda a página?',
    explanation: 'Cada página precisa de uma ação dominante. Evite dar 5 opções diferentes no mesmo bloco (ex: "baixe o app", "curta no Instagram", "leia o blog", "ligue aqui"). Foque em uma ação principal repetida estrategicamente.',
    options: [
      {
        label: 'Conversa Direta no WhatsApp com Especialista',
        description: 'Redirecionamento para conversa já com mensagem pré-preenchida para atendimento em tempo real.',
        recommendedFor: 'Mercado brasileiro em geral: alta taxa de resposta para serviços de ticket médio e alto.'
      },
      {
        label: 'Formulário Curto de Diagnóstico / Orçamento',
        description: 'Campos objetivos (Nome, Contato, Porte do Projeto, Mensagem) para triagem qualificada.',
        recommendedFor: 'Projetos sob medida onde é preciso filtrar o perfil do cliente antes de atender.'
      },
      {
        label: 'Reserva Direta com Escolha de Data e Horário',
        description: 'Calendário interativo integrado para marcação imediata sem necessidade de troca de mensagens.',
        recommendedFor: 'Consultórios, barbearias, bistrôs e reuniões comerciais rápidas.'
      },
      {
        label: 'Comprar Agora / Checkout Seguro',
        description: 'Botão com preço transparente e pagamento via PIX ou Cartão em 1 clique.',
        recommendedFor: 'Produtos prontos para entrega, ingressos e planos recorrentes.'
      }
    ],
    practicalTip: 'O rótulo do botão deve ser explícito e prometer uma ação humana ("Falar com um Especialista" ou "Solicitar Orçamento em 24h", em vez de "Clique Aqui" ou "Saiba Mais").'
  },
  {
    id: 'proof',
    pillar: '5. Provas Incontestáveis & Confiança',
    number: '05',
    title: 'Como Eliminar o Medo e Provar sua Capacidade?',
    question: 'Quais evidências concretas você colocará no site para provar que cumpre o que promete?',
    explanation: 'Visitantes na internet são céticos por padrão. As pessoas não acreditam no que a empresa diz sobre si mesma; elas acreditam em números auditáveis, rostos reais e resultados de outros clientes.',
    options: [
      {
        label: 'Depoimentos Reais com Nome, Foto e Cargo',
        description: 'Relatos de clientes satisfeitos descrevendo como era antes, o que mudou e o resultado alcançado.',
        recommendedFor: 'Essencial para qualquer empresa que queira cobrar valores justos e evitar desconfiança.'
      },
      {
        label: 'Métricas Quantificadas e Anos de Mercado',
        description: 'Números claros (ex: "+140 projetos entregues", "99.8% de satisfação", "12 anos de atuação").',
        recommendedFor: 'Transmite solidez, experiência e segurança institucional imediata.'
      },
      {
        label: 'Fotos de Projetos Reais e Antes/Depois',
        description: 'Registros fotográficos profissionais de obras, pratos ou sistemas entregues.',
        recommendedFor: 'Negócios visuais onde a qualidade fala por si mesma muito mais rápido do que texto.'
      },
      {
        label: 'Garantia Incondicional ou Teste sem Risco',
        description: 'Garantia de satisfação, primeira sessão sem custos ou devolução se não atender ao combinado.',
        recommendedFor: 'Serviços novos no mercado ou produtos digitais de alta concorrência.'
      }
    ],
    practicalTip: 'Regra de Adjacência: sempre coloque a prova social logo abaixo ou ao lado da promessa que você fez, nunca isolada em uma página esquecida.'
  }
];

export const INITIAL_DIAGNOSTIC_STATE: DiagnosticAnswer = {
  category: 'Geração de Contatos & Orçamentos (Leads)',
  primaryGoal: 'Captar clientes qualificados para projetos sob medida através de reuniões de diagnóstico.',
  targetAudience: 'Empresários e gestores buscando serviços de excelência que valorizam pontualidade e acabamento.',
  mainProblemSolved: 'Falta de parceiros confiáveis que entreguem no prazo com garantia contratual.',
  conversionAction: 'Falar com um Especialista via WhatsApp ou Formulário',
  uniqueValueProposition: 'Projetamos e executamos com método estruturado, cronograma rigoroso e acompanhamento direto.',
  proofType: 'Depoimentos com nomes reais, métricas quantitativas e fotos de alta resolução de trabalhos concluídos.',
  siteModel: 'one-page',
  notes: 'Desejo um site moderno, limpo, que carregue instantaneamente e transmita sofisticação técnica.'
};
