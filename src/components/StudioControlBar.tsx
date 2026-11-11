import React from 'react';
import { DeviceViewMode } from '../types';
import { Monitor, Tablet, Smartphone, Moon, Sun, HelpCircle, Inbox, Plus, SlidersHorizontal, Euro, DollarSign } from 'lucide-react';

interface StudioControlBarProps {
  deviceMode: DeviceViewMode;
  onChangeDeviceMode: (mode: DeviceViewMode) => void;
  currency: 'EUR' | 'BRL';
  onToggleCurrency: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  leadsCount: number;
  onOpenLeadsDrawer: () => void;
  onOpenGuideModal: () => void;
  onOpenPublishModal: () => void;
  onOpenSettingsModal: () => void;
  carsCount: number;
}

export const StudioControlBar: React.FC<StudioControlBarProps> = ({
  deviceMode,
  onChangeDeviceMode,
  currency,
  onToggleCurrency,
  isDarkMode,
  onToggleDarkMode,
  leadsCount,
  onOpenLeadsDrawer,
  onOpenGuideModal,
  onOpenPublishModal,
  onOpenSettingsModal,
  carsCount,
}) => {
  return (
    <aside aria-label="Painel de controlo do estúdio" className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs px-4 py-2 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Quick stats & strategic guide button */}
      <div className="flex items-center gap-3">
        <span className="font-semibold text-white flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Stand Online</span>
          <span className="text-slate-400 font-normal">({carsCount} viaturas em estoque)</span>
        </span>

        <span className="text-slate-700 hidden sm:inline">|</span>

        <button
          onClick={onOpenGuideModal}
          className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Guia: Propósito & Público-Alvo</span>
        </button>

        <button
          onClick={onOpenSettingsModal}
          className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Personalizar Stand</span>
        </button>
      </div>

      {/* Center: Responsive Viewport Switcher */}
      <div className="hidden lg:flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700">
        <button
          onClick={() => onChangeDeviceMode('desktop')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer ${
            deviceMode === 'desktop' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Computador (1440px)"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Desktop</span>
        </button>
        <button
          onClick={() => onChangeDeviceMode('tablet')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer ${
            deviceMode === 'tablet' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Tablet (768px)"
        >
          <Tablet className="w-3.5 h-3.5" />
          <span>Tablet</span>
        </button>
        <button
          onClick={() => onChangeDeviceMode('mobile')}
          className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer ${
            deviceMode === 'mobile' ? 'bg-blue-600 text-white font-medium' : 'text-slate-400 hover:text-white'
          }`}
          title="Vista Smartphone (375px)"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile</span>
        </button>
      </div>

      {/* Right: Currency, Dark mode, Leads inbox & Publish shortcut */}
      <div className="flex items-center gap-2">
        {/* Currency Switcher */}
        <button
          onClick={onToggleCurrency}
          className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1 cursor-pointer font-mono"
          title="Alternar moeda entre Euro (€) e Real (R$)"
        >
          {currency === 'EUR' ? <Euro className="w-3.5 h-3.5 text-amber-400" /> : <DollarSign className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{currency}</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
          aria-label="Alternar tema claro/escuro"
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Leads Inbox Drawer */}
        <button
          onClick={onOpenLeadsDrawer}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer relative"
        >
          <Inbox className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Contactos</span>
          {leadsCount > 0 && (
            <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
              {leadsCount}
            </span>
          )}
        </button>

        {/* Quick Publish button */}
        <button
          onClick={onOpenPublishModal}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-colors flex items-center gap-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publicar Carro</span>
        </button>
      </div>
    </aside>
  );
};
