import React, { useState, useEffect } from 'react';
import { VehicleItem, LeadSubmission } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  Phone,
  Calendar,
  Gauge,
  Fuel,
  Cog,
  Check,
  Calculator,
  Clock,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react';

interface VehicleModalProps {
  vehicle: VehicleItem | null;
  currency: 'EUR' | 'BRL';
  onClose: () => void;
  onSubmitLead: (lead: LeadSubmission) => void;
  contactPhone: string;
}

export const VehicleModal: React.FC<VehicleModalProps> = ({
  vehicle,
  currency,
  onClose,
  onSubmitLead,
  contactPhone,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [months, setMonths] = useState<number>(60);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadType, setLeadType] = useState<'veiculo' | 'financiamento' | 'retoma'>('veiculo');
  const [leadMessage, setLeadMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Reset photo index when opening or changing vehicle
  useEffect(() => {
    setActivePhotoIdx(0);
  }, [vehicle?.id]);

  if (!vehicle) return null;

  const currencySymbol = currency === 'EUR' ? '€' : 'R$';
  const formatPrice = (val: number) => {
    return currency === 'EUR'
      ? `${val.toLocaleString('pt-PT')} €`
      : `R$ ${val.toLocaleString('pt-BR')}`;
  };

  // Financing calculation logic
  const entryAmount = Math.round(vehicle.price * (downPaymentPercent / 100));
  const loanAmount = vehicle.price - entryAmount;
  const annualInterestRate = 0.089; // 8.9% a.a.
  const monthlyRate = annualInterestRate / 12;
  const calculatedMonthly = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  const cleanPhone = contactPhone.replace(/\D/g, '');
  const whatsAppUrl = `https://wa.me/${cleanPhone || '351912345678'}?text=${encodeURIComponent(
    `Olá! Tenho interesse no ${vehicle.brand} ${vehicle.model} (${vehicle.year}) anunciado por ${formatPrice(vehicle.price)}. Gostaria de mais informações e simulação.`
  )}`;

  const handleSubmitLeadForm = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: LeadSubmission = {
      id: `lead-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      name: leadName.trim(),
      email: leadEmail.trim(),
      phone: leadPhone.trim(),
      interest: `${vehicle.brand} ${vehicle.model} (${vehicle.year}) - ${formatPrice(vehicle.price)}`,
      type: leadType,
      vehicleDetails: `${vehicle.brand} ${vehicle.model} | Entrada: ${formatPrice(entryAmount)} | ${months}x de ${formatPrice(calculatedMonthly)}`,
      message: leadMessage.trim() || 'Solicitação de agendamento de test-drive e simulação de crédito.'
    };

    onSubmitLead(newLead);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 shrink-0">
          <div>
            <div className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">
              {vehicle.brand} · {vehicle.category}
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {vehicle.model} <span className="text-sm font-normal text-slate-500">({vehicle.year})</span>
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6">
          {/* Main Visual & Key Specs Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Vehicle Gallery & Key Specs Hero */}
            <div className="lg:col-span-7">
              {(() => {
                const photos = vehicle.galleryImages && vehicle.galleryImages.length > 0 ? vehicle.galleryImages : [vehicle.image];
                const currentPhoto = photos[activePhotoIdx] || vehicle.image;

                return (
                  <div className="space-y-2">
                    <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 group">
                      <img
                        src={currentPhoto}
                        alt={`${vehicle.brand} ${vehicle.model} - Foto ${activePhotoIdx + 1}`}
                        className="w-full h-full object-cover transition-all duration-300"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="bg-slate-950/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md font-medium">
                          {vehicle.warrantyMonths} meses garantia total
                        </span>
                      </div>

                      {/* Counter Badge if > 1 photo */}
                      {photos.length > 1 && (
                        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-md font-mono flex items-center gap-1.5 shadow-xs">
                          <Camera className="w-3.5 h-3.5 text-blue-400" />
                          <span>{activePhotoIdx + 1} / {photos.length}</span>
                        </div>
                      )}

                      {/* Navigation Chevrons if > 1 photo */}
                      {photos.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePhotoIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
                            }}
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-md"
                            aria-label="Foto anterior"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActivePhotoIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
                            }}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100 cursor-pointer shadow-md"
                            aria-label="Próxima foto"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}

                      {/* Credit Approval Badge */}
                      <div className="absolute bottom-3 left-3 bg-emerald-950/85 backdrop-blur-sm text-emerald-300 text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium border border-emerald-800/60">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Aprovação de Crédito Imediata</span>
                      </div>
                    </div>

                    {/* Thumbnail Strip (if more than 1 photo) */}
                    {photos.length > 1 && (
                      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
                        {photos.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActivePhotoIdx(idx)}
                            className={`relative shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                              activePhotoIdx === idx
                                ? 'border-blue-600 ring-2 ring-blue-500/40 opacity-100 scale-102'
                                : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'
                            }`}
                            title={`Ver foto ${idx + 1}`}
                          >
                            <img src={p} alt={`Miniatura ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 && (
                              <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-white text-center font-bold">
                                Capa
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* 4 Quick Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3 text-center">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Ano Fabrico</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {vehicle.year}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Quilómetros</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white font-mono tabular-nums flex items-center justify-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-slate-400" /> {vehicle.mileageKm.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Combustível</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                    <Fuel className="w-3.5 h-3.5 text-slate-400" /> {vehicle.fuel}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Caixa</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                    <Cog className="w-3.5 h-3.5 text-slate-400" /> {vehicle.transmission.split(' ')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Price & Commercial Package Box */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  Preço Especial do Stand
                </span>
                <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
                  {formatPrice(vehicle.price)}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Inclui garantia escrita, transferência e revisão geral antes da entrega.
                </p>

                {/* Trust Points */}
                <div className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-700/60 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Quilometragem real certificada em contrato</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Sem registo de sinistros ou danos estruturais</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Aceitamos a sua viatura atual para retoma</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Aprovação de crédito em até 60 minutos</span>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-700/60 space-y-2">
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contactar via WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Ou ligue direto: <strong>{contactPhone}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Opcionais e Equipamentos */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              Equipamentos de Série & Opcionais Incluídos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              {vehicle.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                >
                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Simulador Interativo de Financiamento */}
          <div className="p-5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-sm mb-1">
              <Calculator className="w-4 h-4" />
              <span>Simulador de Financiamento Personalizado</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Ajuste o valor da sua entrada e o prazo desejado para ver a prestação mensal estimada
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
              {/* Slider 1: Entrada */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Entrada ({downPaymentPercent}%)</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{formatPrice(entryAmount)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>Sem entrada (0%)</span>
                  <span>60%</span>
                </div>
              </div>

              {/* Slider 2: Prazo */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Prazo em Meses</span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">{months} meses</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={84}
                  step={12}
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                  <span>12 meses</span>
                  <span>84 meses</span>
                </div>
              </div>

              {/* Resultado da Parcela */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-900 text-center">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Prestação Mensal Estimada</span>
                <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                  {currencySymbol} {calculatedMonthly.toLocaleString()}<span className="text-xs font-normal">/mês</span>
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Taxa indicativa TAEG 8.9%</span>
              </div>
            </div>
          </div>

          {/* Form: Solicitar Proposta / Agendar Test Drive */}
          <div className="border-t border-slate-100 dark:border-slate-800 pt-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Agendar Test Drive ou Enviar Proposta
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Preencha os seus dados e o responsável pelo veículo entrará em contacto em menos de 30 minutos.
            </p>

            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600" />
                <span>
                  <strong>Proposta enviada com sucesso!</strong> Entraremos em contacto pelo telefone informado.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitLeadForm} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    O seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Nome completo"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+351 912 345 678"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Observações ou Veículo para Troca (Retoma)
                  </label>
                  <input
                    type="text"
                    value={leadMessage}
                    onChange={(e) => setLeadMessage(e.target.value)}
                    placeholder="Ex: Gostaria de dar um Renault Megane 2020 como retoma..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-hidden focus:border-blue-500 dark:text-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    Enviar Pedido de Proposta
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
