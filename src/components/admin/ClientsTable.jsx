import React from 'react';
import { MessageCircle, CheckCircle, PauseCircle, XCircle } from 'lucide-react';
import { formatPhoneMask, sanitizePhone } from '../../utils/whatsapp';

export default function ClientsTable({ subscriptions, onUpdateSubscription }) {
  const handleOpenWhatsApp = (sub) => {
    const phone = sanitizePhone(sub.whatsapp);
    const text = `Olá ${sub.tutor_name}! Aqui é da equipe Pata Amiga. Passando para confirmar os detalhes da sua entrega programada para o ${sub.pet_name}. Está tudo certo com a rotina dele?`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[#FCE8EB]/40 border-b border-gray-100 text-xs font-bold text-gray-600 uppercase tracking-wider">
              <th className="py-4 px-4 sm:px-6">Tutor & WhatsApp</th>
              <th className="py-4 px-4 sm:px-6">Pet & Ração</th>
              <th className="py-4 px-4 sm:px-6">Bairro / Rota</th>
              <th className="py-4 px-4 sm:px-6">Valor Mensal</th>
              <th className="py-4 px-4 sm:px-6">Status</th>
              <th className="py-4 px-4 sm:px-6 text-right">Contato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscriptions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-400">
                  Nenhum assinante cadastrado ainda. Use o botão "+ Novo Assinante Manual" para cadastrar!
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-bold text-gray-900">{sub.tutor_name}</div>
                    <div className="text-xs text-gray-500 font-mono">
                      {formatPhoneMask(sub.whatsapp)}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-medium text-gray-900">
                      {sub.pet_name} ({sub.pet_type})
                    </div>
                    <div className="text-xs text-gray-500">
                      {sub.pet_food} {sub.include_treats && '🎁 + mimo'}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-medium text-gray-800">{sub.neighborhood}</div>
                    <div className="text-xs text-salmon font-semibold">
                      {sub.delivery_weekday} ({sub.delivery_cycle})
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <div className="font-bold text-salmon text-base">
                      R$ {Number(sub.monthly_value).toFixed(2).replace('.', ',')}
                    </div>
                  </td>

                  <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                    <select
                      value={sub.status}
                      onChange={(e) => onUpdateSubscription(sub.id, { status: e.target.value })}
                      className="text-xs font-bold rounded-lg px-2.5 py-1.5 border border-gray-200 bg-white outline-none cursor-pointer"
                    >
                      <option value="ativo">Ativo</option>
                      <option value="pausado">Pausado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>

                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <button
                      onClick={() => handleOpenWhatsApp(sub)}
                      className="p-2 bg-[#EBF8F3] hover:bg-[#D4F3E4] text-green-800 rounded-xl transition-colors"
                      title="Chamar cliente no WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
