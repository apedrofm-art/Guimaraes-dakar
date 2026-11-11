import React, { useState, useMemo, useEffect } from 'react';
import { VehicleItem, DeviceViewMode, LeadSubmission } from './types';
import { INITIAL_VEHICLES } from './data/carStock';
import { AutomotiveHeader } from './components/AutomotiveHeader';
import { StudioControlBar } from './components/StudioControlBar';
import { VehicleCard } from './components/VehicleCard';
import { VehicleModal } from './components/VehicleModal';
import { PublishCarModal } from './components/PublishCarModal';
import { PurposeDiagnosticGuideModal } from './components/PurposeDiagnosticGuideModal';
import { TradeInEvaluationModal } from './components/TradeInEvaluationModal';
import { LeadManagerDrawer } from './components/LeadManagerDrawer';
import { StandSettingsModal } from './components/StandSettingsModal';
import {
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Calculator,
  RefreshCw,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  CheckCircle2,
  Car,
  ChevronRight,
  Send,
  Star,
  FileText,
  Sparkles,
  ArrowRight,
  Euro,
  DollarSign
} from 'lucide-react';

export default function App() {
  // Application State - Defaults to Guimarães Dakar
  const [vehicles, setVehicles] = useState<VehicleItem[]>(() => {
    const saved = localStorage.getItem('stand_vehicles_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((car: VehicleItem) => ({
            ...car,
            galleryImages: car.galleryImages && car.galleryImages.length > 0 ? car.galleryImages : [car.image]
          }));
        }
      } catch (e) {
        return INITIAL_VEHICLES;
      }
    }
    return INITIAL_VEHICLES;
  });

  const [leads, setLeads] = useState<LeadSubmission[]>(() => {
    const saved = localStorage.getItem('stand_leads_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: 'lead-default-1',
        timestamp: '11:20',
        name: 'Manuel Silva',
        email: 'manuel.silva@email.pt',
        phone: '+351 914 882 109',
        interest: 'BMW Série 3 Touring (2022) - 33.900 €',
        type: 'veiculo',
        vehicleDetails: 'Interesse em agendar test-drive no stand em Guimarães no sábado de manhã.',
        message: 'Gostaria de saber se aceitam Mercedes Classe C 2018 para retoma.'
      }
    ];
  });

  // Stand Customization Settings - Guimarães Dakar
  const [standSettings, setStandSettings] = useState(() => {
    const saved = localStorage.getItem('stand_settings_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return {
      brandName: 'Guimarães Dakar',
      phone: '+351 912 345 678',
      email: 'contacto@guimaraesdakar.pt',
      address: 'Guimarães, Minho — Portugal'
    };
  });

  // UI Modes & Modals
  const [currency, setCurrency] = useState<'EUR' | 'BRL'>('EUR');
  const [deviceMode, setDeviceMode] = useState<DeviceViewMode>('desktop');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isTradeInModalOpen, setIsTradeInModalOpen] = useState(false);
  const [isLeadsDrawerOpen, setIsLeadsDrawerOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFuel, setSelectedFuel] = useState<string>('all');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc'>('featured');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Informações Gerais');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Standalone Financing Calculator State
  const [calcCarPrice, setCalcCarPrice] = useState<number>(55000);
  const [calcDownPayment, setCalcDownPayment] = useState<number>(10000);
  const [calcMonths, setCalcMonths] = useState<number>(60);

  // Persist vehicles and leads
  useEffect(() => {
    localStorage.setItem('stand_vehicles_v2', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('stand_leads_v2', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('stand_settings_v2', JSON.stringify(standSettings));
  }, [standSettings]);

  // Sync dark mode class on document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Currency Formatter Helper
  const formatMoney = (val: number) => {
    return currency === 'EUR'
      ? `${val.toLocaleString('pt-PT')} €`
      : `R$ ${val.toLocaleString('pt-BR')}`;
  };

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        const matchesSearch =
          !searchQuery.trim() ||
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.version.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.year.toString().includes(searchQuery);

        const matchesCat =
          selectedCategory === 'all' || car.category.toLowerCase() === selectedCategory.toLowerCase();

        const matchesFuel =
          selectedFuel === 'all' || car.fuel.toLowerCase() === selectedFuel.toLowerCase();

        const matchesTrans =
          selectedTransmission === 'all' ||
          (selectedTransmission === 'automatic' && car.transmission.toLowerCase().includes('auto')) ||
          (selectedTransmission === 'manual' && car.transmission.toLowerCase().includes('manual'));

        return matchesSearch && matchesCat && matchesFuel && matchesTrans;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'km-asc') return a.mileageKm - b.mileageKm;
        return 0; // featured / default
      });
  }, [vehicles, searchQuery, selectedCategory, selectedFuel, selectedTransmission, sortBy]);

  // Handlers
  const handlePublishVehicle = (newVehicle: VehicleItem) => {
    setVehicles([newVehicle, ...vehicles]);
  };

  const handleSubmitLead = (newLead: LeadSubmission) => {
    setLeads([newLead, ...leads]);
  };

  const handleOpenWhatsAppVehicle = (vehicle: VehicleItem) => {
    const cleanPhone = standSettings.phone.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone || '351912345678'}?text=${encodeURIComponent(
      `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado no Guimarães Dakar por ${formatMoney(vehicle.price)}. Pode enviar-me mais detalhes?`
    )}`;
    window.open(url, '_blank');
  };

  const handleGeneralContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: LeadSubmission = {
      id: `lead-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      name: contactName.trim(),
      email: contactEmail.trim(),
      phone: contactPhone.trim(),
      interest: contactSubject,
      type: 'geral',
      message: contactMsg.trim()
    };
    handleSubmitLead(newLead);
    setContactSuccess(true);
    setContactMsg('');
    setTimeout(() => setContactSuccess(false), 3000);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Financing calculation for the dedicated financing tool
  const loanPrincipal = Math.max(0, calcCarPrice - calcDownPayment);
  const monthlyRate = 0.089 / 12; // 8.9% a.a.
  const standaloneMonthlyEst = Math.round(
    loanPrincipal > 0
      ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, calcMonths)) /
          (Math.pow(1 + monthlyRate, calcMonths) - 1)
      : 0
  );

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors`}>
      {/* Studio Top Management Bar (Device Switcher, Guidance, Currency, Settings) */}
      <StudioControlBar
        deviceMode={deviceMode}
        onChangeDeviceMode={setDeviceMode}
        currency={currency}
        onToggleCurrency={() => setCurrency((c) => (c === 'EUR' ? 'BRL' : 'EUR'))}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((d) => !d)}
        leadsCount={leads.length}
        onOpenLeadsDrawer={() => setIsLeadsDrawerOpen(true)}
        onOpenGuideModal={() => setIsGuideModalOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        carsCount={vehicles.length}
      />

      {/* Viewport Frame Container for Device Simulation */}
      <div
        className={`flex-1 w-full mx-auto transition-all duration-300 ${
          deviceMode === 'tablet'
            ? 'max-w-[768px] my-6 rounded-2xl shadow-2xl border-4 border-slate-700 overflow-hidden'
            : deviceMode === 'mobile'
            ? 'max-w-[390px] my-6 rounded-3xl shadow-2xl border-8 border-slate-800 overflow-hidden'
            : 'max-w-full'
        }`}
      >
        <div className="bg-white dark:bg-slate-900 shadow-xs min-h-screen flex flex-col">
          {/* Main Top Navigation Header conforming to Top Bar Contract (§2) */}
          <AutomotiveHeader
            brandName={standSettings.brandName}
            onOpenPublishModal={() => setIsPublishModalOpen(true)}
            onNavigateSection={scrollToSection}
          />

          <main id="topo" className="flex-1">
            {/* HERO SECTION: Authentic Guimarães Dakar Showroom Photo as hero background */}
            <section className="relative overflow-hidden bg-slate-950 text-white py-16 sm:py-24">
              {/* Background Photography with Scrim */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif"
                  alt="Stand Guimarães Dakar - Comércio de Automóveis"
                  className="w-full h-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  {/* Official Guimarães Dakar Symbol (Transparent Background) */}
                  <div className="mb-5 inline-block">
                    <img
                      src="/assets/aistudio/guimaraes_dakar_simbolo_branco.png"
                      alt="Guimarães Dakar"
                      className="h-24 sm:h-32 md:h-36 w-auto object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Clean unboxed kicker (§1.A Zero-Pill) */}
                  <div className="text-xs uppercase tracking-widest font-semibold text-blue-400 mb-3 flex items-center gap-2">
                    <span>Comércio de Automóveis</span>
                    <span aria-hidden="true">·</span>
                    <span>Guimarães, Portugal</span>
                  </div>

                  {/* Balanced Headline (§1.D) */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 font-display" style={{ textWrap: 'balance' }}>
                    Automóveis selecionados com rigor, transparência e garantia total
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
                    No <strong>Guimarães Dakar</strong> selecionamos cada viatura com critério minucioso. Entregamos o seu próximo carro com revisão completa, garantia escrita até 36 meses e aprovação de financiamento em menos de 1 hora.
                  </p>

                  {/* Dual Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => scrollToSection('estoque')}
                      className="px-6 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <Car className="w-4 h-4" />
                      <span>Ver Automóveis em Estoque ({vehicles.length})</span>
                    </button>

                    <button
                      onClick={() => setIsTradeInModalOpen(true)}
                      className="px-6 py-3.5 text-sm font-bold text-slate-200 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-colors flex items-center gap-2 cursor-pointer border border-white/15"
                    >
                      <RefreshCw className="w-4 h-4 text-amber-400" />
                      <span>Avaliar a Minha Viatura (Retoma)</span>
                    </button>
                  </div>
                </div>

                {/* Proof & Trust Strip below hero: Only Garantia até 36 Meses and Aprovação de Crédito */}
                <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                        Garantia até 36 Meses
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Garantia escrita completa com assistência e viatura de substituição
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-white font-display">
                        Aprovação de Crédito
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Financiamento automóvel rápido, flexível e à sua medida
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* BRAND SPOTLIGHT: GUIMARÃES DAKAR MURAL & SHOWROOM */}
            <section className="bg-slate-900 border-b border-slate-800 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6">
                    <div className="rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black">
                      <img
                        src="/assets/aistudio/456aff26-7010-49ef-a07a-d269496f583b_ca200d61.jfif"
                        alt="Mural Oficial Guimarães Dakar - Comércio de Automóveis"
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                      A Nossa Casa em Guimarães
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                      Guimarães Dakar: A Paixão Automóvel na Cidade Berço
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Inspirados na força e determinação da mítica prova Dakar e na história nobre de Guimarães, dedicamo-nos ao comércio de automóveis com um padrão intransigente de honestidade e qualidade.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Aqui não encontra carros maquiados. Cada viatura em parque é inspecionada, testada em estrada e pronta para levar a sua família com total tranquilidade.
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Showroom com viaturas disponíveis para test-drive</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Apoio pós-venda dedicado e oficina parceira</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* STRATEGY CALLOUT BANNER: Direct helper for defining purpose & target audience */}
            <section className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/50 py-3 px-4">
              <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-blue-950 dark:text-blue-200">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>
                    <strong>Estratégia do Stand:</strong> Como definir o objetivo principal e o público-alvo para vender mais carros online?
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-colors cursor-pointer"
                  >
                    Ver Respostas & Perguntas Estratégicas
                  </button>
                  <button
                    onClick={() => setIsPublishModalOpen(true)}
                    className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded font-semibold transition-colors cursor-pointer"
                  >
                    + Publicar Automóvel com Preço
                  </button>
                </div>
              </div>
            </section>

            {/* INVENTORY / CATALOG SECTION */}
            <section id="estoque" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    Estoque Atualizado
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                    Automóveis Disponíveis para Entrega Imediata
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Todos os veículos incluem fotos em alta resolução, histórico comprovado, garantia e simulação de parcelas.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsPublishModalOpen(true)}
                    className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Publicar Novo Automóvel</span>
                  </button>
                </div>
              </div>

              {/* Functional Interactive Filter Bar (§1.A Segmented Controls) */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 mb-8 space-y-4">
                {/* Search Input & Sorters */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      placeholder="Pesquisar por marca, modelo, versão ou ano (ex: Porsche, BMW, Diesel, 2024)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        Limpar
                      </button>
                    )}
                  </div>

                  <div className="sm:col-span-4 flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden dark:text-white font-medium"
                    >
                      <option value="featured">Ordenar: Destaques do Stand</option>
                      <option value="price-asc">Menor Preço primeiro</option>
                      <option value="price-desc">Maior Preço primeiro</option>
                      <option value="year-desc">Mais Recentes primeiro</option>
                      <option value="km-asc">Menor Quilometragem</option>
                    </select>
                  </div>
                </div>

                {/* Category Segmented Controls & Dropdowns */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/70 dark:border-slate-700/60">
                  {/* Category Pills (Functional buttons with active state) */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {[
                      { id: 'all', label: 'Todos os Veículos' },
                      { id: 'suv', label: 'SUVs & Crossovers' },
                      { id: 'sedan', label: 'Sedans & Berlinas' },
                      { id: 'elétrico', label: 'Elétricos & Híbridos' },
                      { id: 'esportivo', label: 'Desportivos' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          selectedCategory === tab.id
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Secondary Quick Selectors (Fuel & Transmission) */}
                  <div className="flex items-center gap-2 text-xs">
                    <select
                      value={selectedFuel}
                      onChange={(e) => setSelectedFuel(e.target.value)}
                      className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs dark:text-white"
                    >
                      <option value="all">Combustível (Todos)</option>
                      <option value="gasolina">Gasolina</option>
                      <option value="diesel">Diesel</option>
                      <option value="híbrido">Híbrido</option>
                      <option value="elétrico">Elétrico</option>
                    </select>

                    <select
                      value={selectedTransmission}
                      onChange={(e) => setSelectedTransmission(e.target.value)}
                      className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs dark:text-white"
                    >
                      <option value="all">Caixa (Todas)</option>
                      <option value="automatic">Automática</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Vehicle Cards Grid (3 Columns Desktop, 2 Tablet, 1 Mobile) */}
              {filteredVehicles.length === 0 ? (
                <div className="py-20 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-8">
                  <Car className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1">
                    Nenhum automóvel encontrado com estes filtros
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Experimente limpar a pesquisa ou publicar um novo veículo com esses critérios.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedFuel('all');
                      setSelectedTransmission('all');
                    }}
                    className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Limpar Filtros de Busca
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredVehicles.map((car) => (
                    <VehicleCard
                      key={car.id}
                      vehicle={car}
                      currency={currency}
                      onSelectVehicle={(v) => setSelectedVehicle(v)}
                      onOpenWhatsApp={(v) => handleOpenWhatsAppVehicle(v)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* FINANCING SIMULATOR SECTION (#financiamento) */}
            <section id="financiamento" className="py-16 bg-slate-100/70 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5">
                    <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                      <Calculator className="w-4 h-4" />
                      <span>Crédito Automóvel Rápido</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display mb-3">
                      Simule a prestação ideal para o seu orçamento
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                      Trabalhamos com as principais entidades financeiras para garantir aprovação rápida em menos de 1 hora, taxas competitivas e possibilidade de financiar 100% sem entrada.
                    </p>

                    <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Aprovação simples apenas com Cartão de Cidadão e Comprovativo de Rendimentos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Prazo flexível de 12 até 120 meses à sua escolha</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>Sem comissões de abertura ocultas ou surpresas contratuais</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Calculator Box */}
                  <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                      {/* Car Price */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          <span>Valor da Viatura</span>
                          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {formatMoney(calcCarPrice)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={5000}
                          max={150000}
                          step={2500}
                          value={calcCarPrice}
                          onChange={(e) => setCalcCarPrice(Number(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                          <span>{formatMoney(5000)}</span>
                          <span>{formatMoney(150000)}</span>
                        </div>
                      </div>

                      {/* Down Payment */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                          <span>Entrada Inicial</span>
                          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {formatMoney(calcDownPayment)}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={calcCarPrice}
                          step={1000}
                          value={calcDownPayment}
                          onChange={(e) => setCalcDownPayment(Number(e.target.value))}
                          className="w-full accent-blue-600 cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                          <span>Sem entrada (0%)</span>
                          <span>Até 100%</span>
                        </div>
                      </div>
                    </div>

                    {/* Term Selector */}
                    <div className="mb-6">
                      <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Prazo de Pagamento (Meses)
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                        {[24, 36, 48, 60, 84, 120].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setCalcMonths(m)}
                            className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${
                              calcMonths === m
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {m}m
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Result Card */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block">
                          Prestação Mensal Estimada ({calcMonths} meses)
                        </span>
                        <div className="text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400 mt-0.5">
                          {currency === 'EUR' ? `${standaloneMonthlyEst.toLocaleString()} €` : `R$ ${standaloneMonthlyEst.toLocaleString()}`}
                          <span className="text-xs font-normal text-slate-500"> /mês</span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          Valor financiado: {formatMoney(loanPrincipal)} · TAEG 8.9%
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          const cleanPhone = standSettings.phone.replace(/\D/g, '');
                          const url = `https://wa.me/${cleanPhone || '351912345678'}?text=${encodeURIComponent(
                            `Olá! Simulei um crédito no site para o valor de ${formatMoney(calcCarPrice)} com entrada de ${formatMoney(calcDownPayment)} em ${calcMonths} meses (prestação aprox. ${standaloneMonthlyEst}/mês). Gostaria de avançar com o pedido de aprovação.`
                          )}`;
                          window.open(url, '_blank');
                        }}
                        className="w-full sm:w-auto px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Pedir Aprovação no WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RETOMA / TRADE-IN SECTION (#retoma) */}
            <section id="retoma" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4" />
                    <span>Troque de Automóvel Sem Complicações</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-display mb-3">
                    Aceitamos o seu carro usado como entrada
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                    Não perca tempo a negociar com particulares. Avaliamos a sua viatura atual com valor justo de mercado e deduzimos o montante diretamente no novo veículo ou pagamos no próprio dia.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-xs">
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                      <strong className="block text-white mb-1">01. Envie os Dados</strong>
                      <span className="text-slate-300">Marca, modelo, ano e km do seu automóvel.</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                      <strong className="block text-white mb-1">02. Avaliação em 2h</strong>
                      <span className="text-slate-300">Cotação prévia baseada no valor real de mercado.</span>
                    </div>
                    <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                      <strong className="block text-white mb-1">03. Entrega Chave na Mão</strong>
                      <span className="text-slate-300">Deixe o antigo e saia a conduzir o novo.</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsTradeInModalOpen(true)}
                    className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs transition-colors shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>Pedir Avaliação Gratuita do Meu Carro</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* TRUST & GUARANTEES SECTION (#garantias) */}
            <section id="garantias" className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-1">
                    Compromisso de Confiança
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                    Por que comprar no nosso stand?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Eliminamos todas as incertezas da compra de um automóvel seminovo através de processos certificados.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Card 1 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      Aprovação de Crédito Rápida
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Processo de financiamento descomplicado, com aprovação em menos de 1 hora, planos flexíveis com ou sem entrada inicial e as melhores taxas do mercado.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      Garantia Escrita de 18 a 36 Meses
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Garantia total para peças e mão de obra em oficinas autorizadas em todo o país, com serviço de reboque e viatura de substituição incluídos.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      Quilometragem Real em Contrato
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Garantimos contratualmente que os quilómetros marcados no quadrante são rigorosamente os mesmos registados nos centros de inspeção periódica e na marca.
                    </p>
                  </div>
                </div>

                {/* Real Testimonials */}
                <div className="mt-12 pt-10 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-3">
                      "Comprei a minha BMW Série 3 Touring no Guimarães Dakar e o atendimento do início ao fim foi irrepreensível. O crédito foi aprovado no próprio dia e o carro foi entregue impecavelmente preparado com garantia total."
                    </p>
                    <div className="font-bold text-slate-900 dark:text-white">
                      Rui Albuquerque <span className="font-normal text-slate-500">· Guimarães</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 text-xs">
                    <div className="flex items-center gap-1 text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 italic mb-3">
                      "Fizeram uma excelente avaliação na retoma do meu carro antigo e a diferença financiada ficou com uma prestação muito acessível. Profissionalismo e transparência como raramente se vê."
                    </p>
                    <div className="font-bold text-slate-900 dark:text-white">
                      Helena Valente <span className="font-normal text-slate-500">· Braga</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CONTACT & SHOWROOM SECTION (#contactos) */}
            <section id="contactos" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Stand Info Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-blue-600 dark:text-blue-400 mb-1">
                      Visite o Nosso Showroom
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
                      Venha conhecer o stand em Guimarães
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
                      A nossa equipa comercial está pronta para recebê-lo, apresentar as viaturas em parque e realizar o seu test-drive sem compromisso.
                    </p>
                  </div>

                  {/* Real Showroom Photo Card */}
                  <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-[16/10] bg-slate-900">
                    <img
                      src="/assets/aistudio/fa9dcb9f-3b9a-42bd-8617-e47a3fb3599a_00a73f6c.jfif"
                      alt="Fachada Noturna do Stand Guimarães Dakar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 dark:text-white">Localização do Stand</strong>
                        <span className="text-slate-600 dark:text-slate-400">{standSettings.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 dark:text-white">Telefone & WhatsApp Comercial</strong>
                        <span className="text-slate-600 dark:text-slate-400 font-mono">{standSettings.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <strong className="block text-slate-900 dark:text-white">Horário de Abertura</strong>
                        <span className="text-slate-600 dark:text-slate-400 block">Segunda a Sexta: 09:30 às 19:30</span>
                        <span className="text-slate-600 dark:text-slate-400 block">Sábados: 10:00 às 18:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/${standSettings.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                        'Olá! Gostaria de agendar uma visita presencial ao showroom do Guimarães Dakar.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Falar no WhatsApp com Vendedor</span>
                    </a>
                  </div>
                </div>

                {/* Direct Message Form */}
                <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    Enviar Mensagem ou Pedir Informação
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                    Tem dúvidas sobre alguma viatura ou quer agendar um horário exclusivo? Envie a sua mensagem.
                  </p>

                  {contactSuccess ? (
                    <div className="p-5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      <div>
                        <strong className="block font-bold">Mensagem Recebida com Sucesso!</strong>
                        <span>O nosso departamento comercial responderá no prazo máximo de 30 minutos.</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleGeneralContactSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                            O seu Nome *
                          </label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Nome e apelido"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Telemóvel / WhatsApp *
                          </label>
                          <input
                            type="tel"
                            required
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            placeholder="+351 912 345 678"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                            E-mail
                          </label>
                          <input
                            type="email"
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Assunto
                          </label>
                          <select
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                          >
                            <option value="Informações Gerais">Informações Gerais de Automóvel</option>
                            <option value="Agendamento de Test Drive">Agendamento de Test Drive</option>
                            <option value="Pedido de Financiamento">Pedido de Simulação de Financiamento</option>
                            <option value="Proposta de Retoma">Proposta de Venda de Carro Usado</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                          Mensagem *
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={contactMsg}
                          onChange={(e) => setContactMsg(e.target.value)}
                          placeholder="Indique a viatura de interesse ou a sua dúvida..."
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Enviar Mensagem ao Stand</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </section>
          </main>

          {/* FOOTER: Quiet, single-line links, copyright (§1.B) */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/aistudio/Guimaraes_Dakar_1_b45d02f5.png"
                  alt="Guimarães Dakar"
                  className="h-5 sm:h-5.5 w-auto object-contain dark:invert"
                />
                <span className="text-slate-400">·</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Comércio de Automóveis</span>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <button
                  onClick={() => scrollToSection('estoque')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Estoque
                </button>
                <button
                  onClick={() => scrollToSection('financiamento')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Financiamento
                </button>
                <button
                  onClick={() => setIsTradeInModalOpen(true)}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  Retoma
                </button>
                <button
                  onClick={() => setIsGuideModalOpen(true)}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-blue-600 dark:text-blue-400 font-medium"
                >
                  Guia de Estratégia
                </button>
              </div>

              <div className="text-slate-400 text-[11px]">
                © {new Date().getFullYear()} {standSettings.brandName}. Todos os direitos reservados.
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* MODALS */}
      {/* 1. Vehicle Detail Modal */}
      <VehicleModal
        vehicle={selectedVehicle}
        currency={currency}
        onClose={() => setSelectedVehicle(null)}
        onSubmitLead={handleSubmitLead}
        contactPhone={standSettings.phone}
      />

      {/* 2. Publish Car Modal (User Request Feature) */}
      <PublishCarModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublishVehicle}
        currency={currency}
      />

      {/* 3. Strategic Purpose & Audience Diagnostic Guide Modal */}
      <PurposeDiagnosticGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        brandName={standSettings.brandName}
      />

      {/* 4. Trade-In Evaluation Modal */}
      <TradeInEvaluationModal
        isOpen={isTradeInModalOpen}
        onClose={() => setIsTradeInModalOpen(false)}
        currency={currency}
        onSubmitLead={handleSubmitLead}
      />

      {/* 5. Leads & Contacts Drawer */}
      <LeadManagerDrawer
        isOpen={isLeadsDrawerOpen}
        onClose={() => setIsLeadsDrawerOpen(false)}
        leads={leads}
        onClearLeads={() => setLeads([])}
      />

      {/* 6. Stand Settings Modal */}
      <StandSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        brandName={standSettings.brandName}
        phone={standSettings.phone}
        email={standSettings.email}
        address={standSettings.address}
        onSave={(newSettings) => setStandSettings(newSettings)}
      />
    </div>
  );
}
