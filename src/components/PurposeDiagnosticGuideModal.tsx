import React, { useState } from 'react';
import { X, CheckCircle, HelpCircle, Target, Users, ShieldAlert, Award, Copy, Check, Sparkles } from 'lucide-react';
import { STAND_STRATEGY_GUIDE } from '../data/carStock';

interface PurposeDiagnosticGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName: string;
}

export const PurposeDiagnosticGuideModal: React.FC<PurposeDiagnosticGuideModalProps> = ({
  isOpen,
  onClose,
  brandName,
}) => {
  const [selectedSegment, setSelectedSegment] = useState('Seminovos Selecionados & Premium');
  const [primaryGoal, setPrimaryGoal] = useState('Gerar contactos diretos no WhatsApp com proposta de viatura');
  const [audienceProfile, setAudienceProfile] = useState('Compradores particulares que buscam segurança mecânica e procedência');
  const [trustFactor, setTrustFactor] = useState('Garantia até 36 meses + Aprovação de Crédito Rápida');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    const text = `# Briefing Estratégico do Stand de Automóveis (${brandName})

## 1. Propósito Principal do Site
- Segmento de Atuação: ${selectedSegment}
- Ação Primária de Conversão (Call to Action): ${primaryGoal}
- Papel no Funil: Gerar leads qualificados e agendamentos de test-drive no showroom, sem atrito.

## 2. Público-Alvo e Comportamento
- Perfil do Comprador: ${audienceProfile}
- Maior Objeção a Vencer: Medo de quilómetros adulterados, problemas mecânicos ocultos ou desvalorização excessiva da retoma.

## 3. Redutores de Desconfiança & Proposta de Valor
- Diferencial Competitivo Central: ${trustFactor}
- Elementos Mandatórios em Cada Anúncio: Preço à vista transparente, estimativa de prestação mensal, garantia até 36 meses e botão direto para o WhatsApp do vendedor.
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Definição de Propósito & Público-Alvo do Stand
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Respostas práticas às perguntas essenciais para construir um site automotivo de alta conversão
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar guia"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {/* Intro Box */}
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
            <h3 className="text-sm font-bold text-blue-950 dark:text-blue-300 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              As 4 Perguntas Cardeais para o seu Stand de Automóveis
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Diferente de um e-commerce tradicional de roupas, <strong>ninguém passa o cartão para comprar um carro de 30 mil euros sem falar com uma pessoa</strong>. O objetivo do seu site é gerar <em>confiança instantânea</em> e transformar a visita num contacto direto no WhatsApp ou numa visita física ao showroom.
            </p>
          </div>

          {/* Os 4 Pilares Estruturados */}
          <div className="space-y-6">
            {STAND_STRATEGY_GUIDE.pillars.map((pillar) => (
              <div
                key={pillar.step}
                className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
                    Passo {pillar.step}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {pillar.title}
                  </h4>
                </div>

                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pergunta a fazer a si mesmo: <em>"{pillar.question}"</em>
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                  {pillar.summary}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-semibold text-slate-900 dark:text-white block mb-1">
                    Diretriz Recomendada:
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 mb-2">
                    {pillar.recommendation}
                  </p>

                  {pillar.actionableChecklist && (
                    <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                      {pillar.actionableChecklist.map((item, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {pillar.profiles && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                      {pillar.profiles.map((prof, i) => (
                        <div key={i} className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <strong className="block text-slate-900 dark:text-white text-[11px] mb-0.5">{prof.name}</strong>
                          <span className="block text-[10px] text-slate-500 mb-1">Desejo: {prof.need}</span>
                          <span className="block text-[10px] text-red-600 dark:text-red-400">Medo: {prof.objection}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Ferramenta Interativa de Alinhamento */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Simulador de Posicionamento para o seu Stand</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Selecione as opções do seu negócio para sintetizar a estratégia perfeita do site:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  1. Foco do seu Estoque
                </label>
                <select
                  value={selectedSegment}
                  onChange={(e) => setSelectedSegment(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs dark:text-white"
                >
                  <option value="Seminovos Selecionados & Premium">Seminovos Selecionados & Premium</option>
                  <option value="Veículos Familiares & SUVs">Veículos Familiares & SUVs</option>
                  <option value="Carros Económicos & Primeiro Automóvel">Carros Económicos & Primeiro Automóvel</option>
                  <option value="Elétricos e Híbridos Plug-in">Elétricos e Híbridos Plug-in</option>
                  <option value="Veículos Comerciais & Frotas">Veículos Comerciais & Frotas</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  2. Ação Principal Desejada
                </label>
                <select
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs dark:text-white"
                >
                  <option value="Gerar contactos diretos no WhatsApp com proposta de viatura">WhatsApp direto com carro selecionado</option>
                  <option value="Simulação e aprovação de financiamento online">Simulação e pedido de financiamento online</option>
                  <option value="Agendamento presencial de test-drive no stand">Agendamento de test-drive no showroom</option>
                  <option value="Captação de carros usados para retoma">Captação de viaturas para retoma/compra</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  3. Perfil do Comprador Prioritário
                </label>
                <select
                  value={audienceProfile}
                  onChange={(e) => setAudienceProfile(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs dark:text-white"
                >
                  <option value="Compradores particulares que buscam segurança mecânica e procedência">Particulares buscando segurança e garantia</option>
                  <option value="Famílias que priorizam espaço, conforto e custos previsíveis">Famílias priorizando espaço e previsibilidade</option>
                  <option value="Profissionais e entusiastas buscando status e alta performance">Entusiastas buscando marcas de prestígio</option>
                  <option value="Empresas procurando frotas ou dedução fiscal">Empresas (benefícios fiscais e dedução)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  4. Redutor de Medo Central
                </label>
                <select
                  value={trustFactor}
                  onChange={(e) => setTrustFactor(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs dark:text-white"
                >
                  <option value="Garantia até 36 meses + Aprovação de Crédito Rápida">Garantia até 36 meses + Aprovação de Crédito Rápida</option>
                  <option value="Histórico de revisões na marca + Quilometragem certificada">Histórico na marca oficial + Km real comprovado</option>
                  <option value="14 dias de garantia de devolução ou troca sem custos">14 dias de devolução ou troca se insatisfeito</option>
                  <option value="Avaliação transparente da retoma no ato da visita">Melhor avaliação de retoma do mercado</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Estratégia sintetizada com base nas melhores práticas do setor automotivo.
              </span>

              <button
                type="button"
                onClick={handleCopySummary}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado para a Área de Transferência!' : 'Copiar Resumo Estratégico'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
