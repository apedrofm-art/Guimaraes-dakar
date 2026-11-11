import React from 'react';
import { VehicleItem } from '../types';
import { ShieldCheck, MessageCircle, ArrowRight, Gauge, Fuel, Calendar, Cog, Camera } from 'lucide-react';

interface VehicleCardProps {
  vehicle: VehicleItem;
  currency: 'EUR' | 'BRL';
  onSelectVehicle: (vehicle: VehicleItem) => void;
  onOpenWhatsApp: (vehicle: VehicleItem) => void;
  onDeleteVehicle?: (id: string) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  currency,
  onSelectVehicle,
  onOpenWhatsApp,
}) => {
  const currencySymbol = currency === 'EUR' ? '€' : 'R$';
  const formatPrice = (val: number) => {
    return currency === 'EUR'
      ? `${val.toLocaleString('pt-PT')} €`
      : `R$ ${val.toLocaleString('pt-BR')}`;
  };

  const formatKm = (km: number) => {
    return `${km.toLocaleString(currency === 'EUR' ? 'pt-PT' : 'pt-BR')} km`;
  };

  return (
    <article className="group bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700">
      {/* Vehicle Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model} ${vehicle.year}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // High reliability fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Quiet status badges (functional, single text tag) */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-slate-950/80 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded">
            {vehicle.warrantyMonths} meses garantia
          </span>
          {vehicle.category && (
            <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-slate-800 dark:text-slate-200 text-[11px] font-medium px-2 py-0.5 rounded">
              {vehicle.category}
            </span>
          )}
        </div>

        {/* Photo Count Badge (if vehicle has gallery with 2+ photos) */}
        {vehicle.galleryImages && vehicle.galleryImages.length > 1 && (
          <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-white text-[11px] px-2 py-0.5 rounded flex items-center gap-1 font-mono shadow-xs">
            <Camera className="w-3 h-3 text-blue-400" />
            <span>{vehicle.galleryImages.length} fotos</span>
          </div>
        )}

        {/* Credit badge */}
        <div className="absolute bottom-3 left-3 bg-slate-950/75 backdrop-blur-sm text-slate-200 text-[11px] px-2 py-0.5 rounded flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Aprovação de Crédito Imediata</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mb-1">
            {vehicle.brand}
          </div>

          {/* Model Title */}
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {vehicle.model}
          </h3>

          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5 mb-3">
            {vehicle.version}
          </p>

          {/* Unboxed Metadata with Typographic Separator (§1.A Zero-Pill Discipline) */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-400 py-2 border-t border-b border-slate-100 dark:border-slate-800/80 mb-4">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {vehicle.year}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1 font-mono tabular-nums">
              <Gauge className="w-3.5 h-3.5 text-slate-400" />
              {formatKm(vehicle.mileageKm)}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1">
              <Fuel className="w-3.5 h-3.5 text-slate-400" />
              {vehicle.fuel}
            </span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
            <span className="inline-flex items-center gap-1">
              <Cog className="w-3.5 h-3.5 text-slate-400" />
              {vehicle.transmission}
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Preço à vista</span>
              <span className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {formatPrice(vehicle.price)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Financiamento desde</span>
              <span className="text-sm font-semibold font-mono tabular-nums text-blue-600 dark:text-blue-400">
                {currencySymbol} {vehicle.monthlyEstimate.toLocaleString()}/mês
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onSelectVehicle(vehicle)}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Ver Detalhes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenWhatsApp(vehicle)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
