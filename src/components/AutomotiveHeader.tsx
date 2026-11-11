import React from 'react';
import { Plus } from 'lucide-react';

interface AutomotiveHeaderProps {
  brandName: string;
  onOpenPublishModal: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const AutomotiveHeader: React.FC<AutomotiveHeaderProps> = ({
  brandName,
  onOpenPublishModal,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-black/95 text-white backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Wordmark with authentic Dakar typography in white */}
        <a
          href="#topo"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center whitespace-nowrap shrink-0 group py-1"
          title="Guimarães Dakar — Início"
        >
          <img
            src="/assets/aistudio/Guimaraes_Dakar_1_b45d02f5.png"
            alt="Guimarães Dakar"
            className="h-5 sm:h-5.5 w-auto object-contain invert transition-opacity group-hover:opacity-85"
          />
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links in white */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateSection('estoque')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Veículos em Estoque
          </button>
          <button
            onClick={() => onNavigateSection('financiamento')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Simulador de Financiamento
          </button>
          <button
            onClick={() => onNavigateSection('retoma')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Avaliar Retoma
          </button>
          <button
            onClick={() => onNavigateSection('garantias')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Garantia & Procedência
          </button>
          <button
            onClick={() => onNavigateSection('contactos')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Contactos & Showroom
          </button>
        </nav>

        {/* Zone 3: 1 primary action (§2) */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenPublishModal}
            className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Automóvel</span>
          </button>
        </div>
      </div>
    </header>
  );
};
