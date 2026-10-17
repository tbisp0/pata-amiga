import React from 'react';
import { CheckCircle2, MessageCircle, X } from 'lucide-react';
import { getClientInitiatedWhatsAppUrl } from '../utils/whatsapp';

export default function SuccessModal({ lead, onClose, onClientCalledWhatsApp }) {
  if (!lead) return null;

  const handleOpenWhatsApp = () => {
    onClientCalledWhatsApp(lead.id);
    const url = getClientInitiatedWhatsAppUrl(lead);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center relative animate-scaleUp">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ícone de Sucesso */}
        <div className="w-16 h-16 rounded-full bg-[#EBF8F3] text-water-green-dark flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10 text-[#2E7D62]" />
        </div>

        {/* Título */}
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 mb-2">
          Recebemos os dados do seu pet, {lead.tutor_name.split(' ')[0]}!
        </h3>

        {/* Subtítulo */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Nossa equipe já está separando as opções de ração e o mimo artesanal para o seu bairro ({lead.neighborhood}).
        </p>

        {/* Ação Principal: WhatsApp Imediato */}
        <button
          onClick={handleOpenWhatsApp}
          className="w-full py-4 px-6 bg-salmon hover:bg-salmon-hover text-white font-bold text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-3"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Abrir WhatsApp agora</span>
        </button>

        {/* Ação Secundária */}
        <button
          onClick={onClose}
          className="text-xs text-salmon hover:underline font-semibold"
        >
          Cadastrar outro pet ou voltar ao início
        </button>
      </div>
    </div>
  );
}
