import React, { useState } from 'react';
import { MessageCircle, Copy, Check, UserCheck, Clock, ExternalLink } from 'lucide-react';
import { getAdminContactWhatsAppUrl, getProposalTemplate, formatPhoneMask } from '../../utils/whatsapp';

export default function LeadsTable({ leads, onUpdateLead, onConvertLead }) {
  const [copiedId, setCopiedId] = useState(null);

  const getSlaIndicator = (createdAt, status) => {
    if (status === 'assinatura_ativa' || status === 'perdido') {
      return { text: 'Concluído', color: 'bg-gray-100 text-gray-500 border-gray-200' };
    }
    const diffMinutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / (60 * 1000));
    
    if (diffMinutes < 10) {
      return {
        text: `${diffMinutes}m (SLA Excelente)`,
        color: 'bg-green-50 text-green-700 border-green-200'
      };
    }
    if (diffMinutes <= 20) {
      return {
        text: `${diffMinutes}m (Atenção)`,
        color: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      };
    }
    return {
      text: `${diffMinutes}m (Urgente)`,
      color: 'bg-red-50 text-red-700 border-red-200 animate-pulse'
    };
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'novo_lead':
        return { label: 'Novo Lead', class: 'bg-[#FFF2CD] text-[#975A16]' };
      case 'em_conversa':
        return { label: 'Em Conversa', class: 'bg-[#FCE8EB] text-[#C53030]' };
      case 'proposta_enviada':
        return { label: 'Proposta Enviada', class: 'bg-blue-50 text-blue-700' };
      case 'assinatura_ativa':
        return { label: 'Assinatura Ativa', class: 'bg-[#C6F6D5] text-[#22543D]' };
      case 'perdido':
        return { label: 'Perdido', class: 'bg-gray-100 text-gray-500' };
      default:
        return { label: status, class: 'bg-gray-100 text-gray-700' };
    }
  };

  const handleCopyProposal = (lead) => {
    const text = getProposalTemplate(lead);
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenWhatsApp = (lead) => {
    const url = getAdminContactWhatsAppUrl(lead);
    if (lead.status === 'novo_lead') {
      onUpdateLead(lead.id, {
        status: 'em_conversa',
        first_contact_at: new Date().toISOString()
      });
    }
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[#FCE8EB]/40 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <th className="py-4 px-4 sm:px-6">SLA / Tempo</th>
              <th className="py-4 px-4 sm:px-6">Tutor & WhatsApp</th>
              <th className="py-4 px-4 sm:px-6">Bairro</th>
              <th className="py-4 px-4 sm:px-6">Ração Atual</th>
              <th className="py-4 px-4 sm:px-6">Status</th>
              <th className="py-4 px-4 sm:px-6 text-right">Ações Rápidas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-400">
                  Nenhum lead recebido ainda. Preencha o formulário na página inicial para testar!
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const sla = getSlaIndicator(lead.created_at, lead.status);
                const badge = getStatusBadge(lead.status);

                return (
                  <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                    {/* SLA */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${sla.color}`}>
                          <Clock className="w-3 h-3" />
                          {sla.text}
                        </span>
                        {lead.client_initiated_chat && (
                          <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                            ✓ Cliente já chamou
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Tutor */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-gray-900">{lead.tutor_name}</div>
                      <div className="text-xs text-gray-500 font-mono">
                        {formatPhoneMask(lead.whatsapp)}
                      </div>
                    </td>

                    {/* Bairro */}
                    <td className="py-4 px-4 sm:px-6 text-gray-700 font-medium whitespace-nowrap">
                      {lead.neighborhood}
                    </td>

                    {/* Ração */}
                    <td className="py-4 px-4 sm:px-6 text-gray-700 max-w-xs truncate">
                      {lead.current_pet_food}
                    </td>

                    {/* Status Selector */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateLead(lead.id, { status: e.target.value })}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border-none outline-none cursor-pointer ${badge.class}`}
                      >
                        <option value="novo_lead">Novo Lead</option>
                        <option value="em_conversa">Em Conversa</option>
                        <option value="proposta_enviada">Proposta Enviada</option>
                        <option value="assinatura_ativa">Assinatura Ativa</option>
                        <option value="perdido">Perdido</option>
                      </select>
                    </td>

                    {/* Ações Rápidas */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Chamar no WhatsApp */}
                        <button
                          onClick={() => handleOpenWhatsApp(lead)}
                          className="p-2 bg-[#EBF8F3] hover:bg-[#D4F3E4] text-green-800 rounded-xl transition-colors"
                          title="Abrir WhatsApp com mensagem pronta"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>

                        {/* Copiar Proposta */}
                        <button
                          onClick={() => handleCopyProposal(lead)}
                          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors relative"
                          title="Copiar texto da proposta para área de transferência"
                        >
                          {copiedId === lead.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        {/* Converter em Assinante */}
                        {lead.status !== 'assinatura_ativa' && (
                          <button
                            onClick={() => onConvertLead(lead)}
                            className="px-2.5 py-1.5 bg-salmon hover:bg-salmon-hover text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1 shadow-xs"
                            title="Converter em Assinante Ativo"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Converter</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
