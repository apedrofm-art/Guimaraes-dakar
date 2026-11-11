export type SitePresetId = 'automotive-stand' | 'creative-studio' | 'local-bistro' | 'tech-consultancy';

export type DeviceViewMode = 'desktop' | 'tablet' | 'mobile';

export interface VehicleItem {
  id: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  monthlyEstimate: number;
  mileageKm: number;
  fuel: 'Gasolina' | 'Híbrido' | 'Elétrico' | 'Diesel' | 'Flex';
  transmission: 'Automático' | 'Manual' | 'PDK / Dupla Embreagem';
  category: 'SUV' | 'Sedan' | 'Esportivo' | 'Elétrico';
  image: string;
  galleryImages?: string[];
  features: string[];
  inspectionItemsCount: number;
  warrantyMonths: number;
  color: string;
  plateFinal: string;
  available: boolean;
}

export interface SiteService {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  result: string;
  year: string;
  summary: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  impactMetric: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  highlighted?: boolean;
  features: string[];
  ctaLabel: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteContent {
  presetId: SitePresetId;
  brandName: string;
  badgeKicker: string;
  heroHeadline: string;
  heroSubheadline: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImage: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  openingHours?: string;
  metrics: {
    value: string;
    label: string;
    context: string;
  }[];
  services: SiteService[];
  vehicles?: VehicleItem[];
  portfolio?: PortfolioItem[];
  testimonials: TestimonialItem[];
  pricing?: PricingPlan[];
  faqs: FaqItem[];
}

export interface DiagnosticAnswer {
  category?: string;
  standSegment?: string;
  primaryGoal: string;
  targetAudience: string;
  mainProblemSolved: string;
  conversionAction: string;
  uniqueValueProposition: string;
  proofType: string;
  tradeInPolicy?: string;
  financingOffer?: string;
  siteModel?: 'one-page' | 'multi-page' | 'ecommerce';
  notes: string;
}

export interface LeadSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  type: 'veiculo' | 'financiamento' | 'retoma' | 'geral';
  vehicleDetails?: string;
  message: string;
}
