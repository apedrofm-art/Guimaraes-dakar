import { VehicleItem } from '../types';

export const INITIAL_VEHICLES: VehicleItem[] = [
  {
    id: 'car-bmw-touring',
    brand: 'BMW',
    model: 'Série 3 Touring',
    version: '320d Pack Advantage Auto 190cv',
    year: 2022,
    price: 33900,
    monthlyEstimate: 395,
    mileageKm: 68500,
    fuel: 'Diesel',
    transmission: 'Automático',
    category: 'Sedan',
    image: '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif',
    galleryImages: [
      '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif',
      '/assets/aistudio/456aff26-7010-49ef-a07a-d269496f583b_ca200d61.jfif',
      '/src/assets/images/car_mercedes_amg_1794394696046.jpg',
      '/src/assets/images/hero_auto_showroom_1794394695426.jpg',
      '/src/assets/images/car_porsche_macan_1794394696079.jpg',
      '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif'
    ],
    color: 'Branco Alpino',
    plateFinal: 'PT-32',
    inspectionItemsCount: 180,
    warrantyMonths: 24,
    available: true,
    features: [
      'Viatura nacional em exposição no stand Guimarães Dakar',
      'Caixa automática desportiva Steptronic de 8 velocidades',
      'Faróis LED adaptativos com luzes de condução diurna',
      'Sistema de navegação profissional BMW Live Cockpit',
      'Sensores de estacionamento dianteiros e traseiros com câmara',
      'Portão da bagageira com acionamento elétrico',
      'Jantes de liga leve de 17 polegadas raiadas originais BMW',
      'Histórico completo de manutenção comprovado na marca'
    ]
  },
  {
    id: 'car-mercedes-e',
    brand: 'Mercedes-Benz',
    model: 'Classe E Berlina',
    version: '220 d Avantgarde 9G-Tronic 194cv',
    year: 2021,
    price: 36800,
    monthlyEstimate: 430,
    mileageKm: 74200,
    fuel: 'Diesel',
    transmission: 'Automático',
    category: 'Sedan',
    image: '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif',
    galleryImages: [
      '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif',
      '/src/assets/images/car_mercedes_amg_1794394696046.jpg',
      '/assets/aistudio/456aff26-7010-49ef-a07a-d269496f583b_ca200d61.jfif',
      '/src/assets/images/hero_auto_showroom_1794394695426.jpg',
      '/src/assets/images/car_porsche_macan_1794394696079.jpg',
      '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif'
    ],
    color: 'Azul Cavansite Metalizado',
    plateFinal: 'MP-04',
    inspectionItemsCount: 175,
    warrantyMonths: 24,
    available: true,
    features: [
      'Linha Avantgarde interior e exterior com acabamentos cromados',
      'Widescreen Cockpit com ecrãs panorâmicos duplos',
      'Faróis LED de alta performance com assistente de máximos',
      'Estofos ergonómicos em pele e tecido Artico',
      'Caixa automática 9G-Tronic com patilhas no volante',
      'Iluminação ambiente premium de 64 cores',
      'Assistente ativo de travagem e deteção de fadiga'
    ]
  },
  {
    id: 'car-mini-countryman',
    brand: 'MINI',
    model: 'Countryman',
    version: 'Cooper D ALL4 Auto 150cv',
    year: 2022,
    price: 27900,
    monthlyEstimate: 330,
    mileageKm: 59000,
    fuel: 'Diesel',
    transmission: 'Automático',
    category: 'SUV',
    image: '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif',
    galleryImages: [
      '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif',
      '/src/assets/images/hero_auto_showroom_1794394695426.jpg',
      '/assets/aistudio/456aff26-7010-49ef-a07a-d269496f583b_ca200d61.jfif',
      '/src/assets/images/car_porsche_macan_1794394696079.jpg',
      '/src/assets/images/car_mercedes_amg_1794394696046.jpg',
      '/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif'
    ],
    color: 'Vermelho Chili com Teto Branco',
    plateFinal: 'MN-18',
    inspectionItemsCount: 160,
    warrantyMonths: 24,
    available: true,
    features: [
      'Tração integral inteligente ALL4',
      'Pintura bicolor com teto e espelhos em branco glaciar',
      'Ecrã tátil central circular característico MINI com navegação',
      'Bancos desportivos com ajuste de apoio lateral',
      'Modos de condução MINI Driving Modes (Sport, Mid, Green)',
      'Abertura e arranque sem chave Comfort Access'
    ]
  },
  {
    id: 'car-1',
    brand: 'Porsche',
    model: 'Cayenne Turbo GT',
    version: '4.0 V8 Bi-Turbo 659cv Tiptronic S',
    year: 2024,
    price: 189500,
    monthlyEstimate: 2190,
    mileageKm: 14200,
    fuel: 'Gasolina',
    transmission: 'Automático',
    category: 'SUV',
    image: '/src/assets/images/car_porsche_macan_1794394696079.jpg',
    color: 'Cinzento Vulcano Metalizado',
    plateFinal: 'AA-42',
    inspectionItemsCount: 180,
    warrantyMonths: 24,
    available: true,
    features: [
      'Pacote Sport Chrono com seletor de modos',
      'Travões em cerâmica Porsche Ceramic Composite (PCCB)',
      'Teto panorâmico integral em carbono leve',
      'Suspensão pneumática adaptativa com PASM',
      'Sistema de som surround Burmester 3D High-End',
      'Faróis LED Matrix escurecidos com PDLS Plus',
      'Jantes GT Design de 22 polegadas em Neodímio',
      'Bancos desportivos elétricos de 18 vias com memória'
    ]
  },
  {
    id: 'car-2',
    brand: 'Audi',
    model: 'A6 Sedan',
    version: '50 TDI quattro S-Line Tiptronic 286cv',
    year: 2023,
    price: 68900,
    monthlyEstimate: 820,
    mileageKm: 38500,
    fuel: 'Diesel',
    transmission: 'Automático',
    category: 'Sedan',
    image: '/src/assets/images/car_mercedes_amg_1794394696046.jpg',
    color: 'Azul Navarra Metalizado',
    plateFinal: 'BC-88',
    inspectionItemsCount: 160,
    warrantyMonths: 18,
    available: true,
    features: [
      'Tração integral permanente quattro com diferencial desportivo',
      'Audi Virtual Cockpit Plus de 12.3 polegadas',
      'Faróis HD Matrix LED com piscas dinâmicos',
      'Pack de assistência ao condutor Tour com Cruise Control Preditivo',
      'Estofos desportivos em couro Valcona S-Line',
      'Sistema de navegação MMI Navigation plus com MMI touch',
      'Climatização automática de 4 zonas independente',
      'Sensores 360º com câmara de marcha-atrás de alta definição'
    ]
  },
  {
    id: 'car-5',
    brand: 'Tesla',
    model: 'Model Y',
    version: 'Long Range Dual Motor AWD 514cv',
    year: 2024,
    price: 49900,
    monthlyEstimate: 580,
    mileageKm: 18900,
    fuel: 'Elétrico',
    transmission: 'Automático',
    category: 'Elétrico',
    image: '/src/assets/images/car_porsche_macan_1794394696079.jpg',
    color: 'Cinzento Meia-Noite Metalizado',
    plateFinal: 'KL-33',
    inspectionItemsCount: 140,
    warrantyMonths: 36,
    available: true,
    features: [
      'Autonomia homologada de até 533 km WLTP',
      'Acesso total à rede europeia de Superchargers Tesla V3/V4',
      'Autopilot aperfeiçoado com navegação em piloto automático',
      'Interior minimalista premium com ecrã tátil central de 15 polegadas',
      'Bomba de calor de alta eficiência para climatização rápida',
      'Garantia oficial do fabricante para bateria e motores até 2032',
      'Atualizações remotas de software via Wi-Fi constantes'
    ]
  }
];

export const STAND_STRATEGY_GUIDE = {
  title: 'Guia Estratégico: Como Definir o Propósito e Público do seu Stand',
  subtitle: 'Estrutura comprovada para transformar cliques em carros vendidos e visitas ao showroom',
  pillars: [
    {
      step: '01',
      title: 'Definir o Propósito Central do Site',
      question: 'Qual é o papel exato do site na jornada de compra do automóvel?',
      summary: 'Dificilmente um cliente compra um automóvel de milhares de euros/reais num carrinho de compras com cartão de crédito sem ver o carro ou falar com o vendedor.',
      recommendation: 'Portanto, o propósito número 1 do site é gerar LEADS QUALIFICADOS: fazer o cliente clicar no botão do WhatsApp já com o carro selecionado, pedir uma simulação de crédito ou agendar um test-drive presencial no stand.',
      actionableChecklist: [
        'Ter botão de WhatsApp direto em cada anúncio de carro',
        'Simulador de financiamento simples para mostrar a parcela que cabe no bolso',
        'Formulário "Avalie o meu Usado" para facilitar a entrada/retoma',
        'Endereço físico claro com horário e mapa do stand'
      ]
    },
    {
      step: '02',
      title: 'Identificar o Perfil do Cliente Ideal',
      question: 'Quem compra no seu stand e qual é a sua principal motivação?',
      summary: 'Um stand de seminovos premium atende compradores muito diferentes de um stand de carros utilitários ou populares.',
      recommendation: 'Mapeie o seu foco principal entre os 3 grandes perfis automotivos:',
      profiles: [
        {
          name: 'Comprador de Carros Familiares & SUVs',
          need: 'Espaço, segurança, baixo consumo e mala generosa.',
          objection: 'Medo de o carro ter histórico de batidas ou manutenção cara.'
        },
        {
          name: 'Entusiasta / Executivo Premium',
          need: 'Status, cavalagem, design, estofos em pele e marcas de prestígio.',
          objection: 'Quer procedência impecável, revisões na marca e baixa quilometragem.'
        },
        {
          name: 'Comprador Racional / Primeiro Carro',
          need: 'Preço acessível, prestação mensal baixa e mecânica confiável.',
          objection: 'Medo de juros abusivos e de despesas mecânicas inesperadas.'
        }
      ]
    },
    {
      step: '03',
      title: 'Neutralizar o Maior Medo do Comprador',
      question: 'Por que muitos clientes têm receio de comprar carros usados?',
      summary: 'O maior obstáculo de qualquer stand de automóveis é a DESCONFIANÇA: medo de quilómetros adulterados, sinistros ocultos, peças gastas e garantias que não cobrem nada.',
      recommendation: 'O seu site precisa estampar em letras garrafais os REDUTORES DE MEDO:',
      actionableChecklist: [
        'Selo de Relatório Cautelar / Inspeção de 150+ pontos certificada',
        'Garantia escrita de 12 a 36 meses com assistência em viagem',
        'Quilometragem real certificada e histórico de revisões comprovado',
        'Opção de devolução ou troca nos primeiros 14 dias se insatisfeito'
      ]
    },
    {
      step: '04',
      title: 'Apresentação Perfeita dos Automóveis',
      question: 'O que não pode faltar na publicação de cada veículo?',
      summary: 'Fotos de alta resolução em ângulos limpos, descrição honesta e transparência de preços vendem 4x mais rápido do que anúncios incompletos.',
      recommendation: 'Padronize cada publicação com 5 elementos obrigatórios:',
      actionableChecklist: [
        'Preço de venda à vista transparente + estimativa de prestação mensal',
        'Ficha com Ano, Quilómetros, Combustível, Potência e Transmissão destacados',
        'Lista clara de opcionais que agregam valor (teto panorâmico, ecrã, jantes)',
        'Fotos nítidas de frente, traseira, perfil, interior, quadrante de km e mala',
        'Botão "Quero este Carro" que envia o link direto para o WhatsApp do vendedor'
      ]
    }
  ]
};
