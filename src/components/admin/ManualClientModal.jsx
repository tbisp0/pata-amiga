import React, { useState } from 'react';
import { X, UserPlus, Check } from 'lucide-react';
import { CAMPINAS_NEIGHBORHOODS } from '../../utils/mockData';
import { formatPhoneMask } from '../../utils/whatsapp';

export default function ManualClientModal({ isOpen, onClose, onSave, initialData = null }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    tutor_name: initialData?.tutor_name || '',
    whatsapp: initialData?.whatsapp ? formatPhoneMask(initialData.whatsapp) : '',
    neighborhood: initialData?.neighborhood || 'Cambuí',
    pet_name: initialData?.pet_name || '',
    pet_type: 'Cachorro',
    pet_food: initialData?.current_pet_food || '',
    monthly_value: '219.90',
    delivery_cycle: 'mensal',
    delivery_weekday: 'Quinta-feira',
    include_treats: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tutor_name || !formData.whatsapp || !formData.pet_food) {
      alert('Por favor, preencha os campos obrigatórios (Tutor, WhatsApp e Ração).');
      return;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-salmon-light flex items-center justify-center text-salmon">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">
                {initialData ? 'Converter Lead em Assinante' : 'Novo Assinante Manual'}
              </h3>
              <p className="text-xs text-gray-500">
                {initialData ? 'Defina o plano acordado no WhatsApp' : 'Cadastro de cliente captado em condomínio'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nome do Tutor *
              </label>
              <input
                type="text"
                required
                value={formData.tutor_name}
                onChange={(e) => setFormData({ ...formData, tutor_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-salmon"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                WhatsApp com DDD *
              </label>
              <input
                type="text"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: formatPhoneMask(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-salmon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Bairro em Campinas *
              </label>
              <select
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-salmon"
              >
                {CAMPINAS_NEIGHBORHOODS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Tipo do Pet
              </label>
              <select
                value={formData.pet_type}
                onChange={(e) => setFormData({ ...formData, pet_type: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-salmon"
              >
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Nome do Pet
              </label>
              <input
                type="text"
                placeholder="Ex.: Thor"
                value={formData.pet_name}
                onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-salmon"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Ração Contratada *
              </label>
              <input
                type="text"
                required
                placeholder="Ex.: Premier Raças Pequenas 12kg"
                value={formData.pet_food}
                onChange={(e) => setFormData({ ...formData, pet_food: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-salmon"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Valor Mensal (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.monthly_value}
                onChange={(e) => setFormData({ ...formData, monthly_value: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-salmon font-semibold text-salmon"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Frequência
              </label>
              <select
                value={formData.delivery_cycle}
                onChange={(e) => setFormData({ ...formData, delivery_cycle: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-salmon"
              >
                <option value="mensal">Mensal</option>
                <option value="quinzenal">Quinzenal</option>
                <option value="a cada 45 dias">A cada 45 dias</option>
                <option value="bimestral">Bimestral</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Dia da Rota
              </label>
              <select
                value={formData.delivery_weekday}
                onChange={(e) => setFormData({ ...formData, delivery_weekday: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white outline-none focus:border-salmon"
              >
                <option value="Quinta-feira">Quinta-feira</option>
                <option value="Terça-feira">Terça-feira</option>
                <option value="Sábado">Sábado</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer bg-baby-pink/30 p-3 rounded-xl border border-baby-pink-border">
              <input
                type="checkbox"
                checked={formData.include_treats}
                onChange={(e) => setFormData({ ...formData, include_treats: e.target.checked })}
                className="rounded text-salmon focus:ring-salmon w-4 h-4"
              />
              <span className="text-xs font-medium text-gray-800">
                🎁 Incluir mimo artesanal natural desidratado em cada entrega
              </span>
            </label>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-200 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-salmon hover:bg-salmon-hover text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirmar Assinante</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
