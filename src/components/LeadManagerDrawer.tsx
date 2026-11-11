import React from 'react';
import { X, MessageSquare, Phone, Mail, Clock, MessageCircle, Trash2, CheckCircle2 } from 'lucide-react';
import { LeadSubmission } from '../types';

interface LeadManagerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onClearLeads: () => void;
}

export const LeadManagerDrawer: React.FC<LeadManagerDrawerProps> = ({
  isOpen,
  onClose,
  leads,
  onClearLeads,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
              {leads.length}
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Contactos e Propostas Recebidas
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Leads de compradores e pedidos de test-drive do site
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar painel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {leads.length === 0 ? (
            <div className="py-16 text-center px-4">
              <MessageSquare className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Nenhum contacto recebido ainda
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Quando um cliente solicitar um test-drive, simulação de crédito ou retoma no site, o registo aparecerá aqui em tempo real.
              </p>
            </div>
          ) : (
            leads.map((lead) => {
              const cleanPhone = lead.phone.replace(/\D/g, '');
              const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Olá ${lead.name}, recebemos o seu contacto pelo site do stand a respeito de: ${lead.interest}. Como podemos ajudar?`
              )}`;

              return (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {lead.name}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" /> {lead.timestamp}
                    </span>
                  </div>

                  <div className="text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Interesse / Carro:
                    </span>
                    <strong className="text-blue-600 dark:text-blue-400">{lead.interest}</strong>
                  </div>

                  {lead.vehicleDetails && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-100 dark:border-slate-800">
                      {lead.vehicleDetails}
                    </div>
                  )}

                  {lead.message && (
                    <p className="text-slate-600 dark:text-slate-300 italic text-[11px]">
                      "{lead.message}"
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-mono text-slate-600 dark:text-slate-300">
                      {lead.phone}
                    </span>

                    {lead.phone && (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Responder no WhatsApp</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {leads.length > 0 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-between items-center">
            <button
              onClick={onClearLeads}
              className="text-xs text-red-600 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar histórico</span>
            </button>
            <span className="text-[11px] text-slate-400">
              Total: {leads.length} pedidos
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
