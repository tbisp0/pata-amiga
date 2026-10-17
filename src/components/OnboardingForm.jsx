import React, { useState } from 'react';
import { User, PawPrint, ChevronDown, Sparkles } from 'lucide-react';
import { CAMPINAS_NEIGHBORHOODS } from '../utils/mockData';
import { formatPhoneMask } from '../utils/whatsapp';
import confetti from 'canvas-confetti';

export default function OnboardingForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    tutor_name: '',
    whatsapp: '',
    neighborhood: '',
    current_pet_food: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e) => {
    const masked = formatPhoneMask(e.target.value);
    setFormData(prev => ({ ...prev, whatsapp: masked }));
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: null }));
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.tutor_name.trim()) {
      errs.tutor_name = 'Por favor, informe seu nome';
    }
    const cleanPhone = formData.whatsapp.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.whatsapp = 'Informe um WhatsApp com DDD válido';
    }
    if (!formData.neighborhood) {
      errs.neighborhood = 'Selecione seu bairro em Campinas';
    }
    if (!formData.current_pet_food.trim()) {
      errs.current_pet_food = 'Informe a ração ou marca habitual';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Dispara confetes de comemoração
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#FF7F66', '#A8E6CF', '#FFF1C5']
      });
    } catch {
      // Fallback silencioso
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 400);
  };

  return (
    <section id="formulario" className="w-full py-16 px-4 max-w-4xl mx-auto">
      {/* Título e Subtítulo */}
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-salmon uppercase tracking-wider block mb-2">
          LEVA MENOS DE 1 MINUTO
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1A202C] mb-3">
          Vamos montar o plano do seu pet?
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          Preencha os dados abaixo e chamamos você no WhatsApp com uma proposta personalizada.
        </p>
      </div>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#FAD7DC] rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bloco 1: Sobre você */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#FCE8EB] flex items-center justify-center text-salmon">
                <User className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Sobre você</h3>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Seu nome *
              </label>
              <input
                type="text"
                placeholder="Como podemos te chamar?"
                value={formData.tutor_name}
                onChange={(e) => handleChange('tutor_name', e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all outline-none focus:ring-2 focus:ring-salmon/30 ${
                  errors.tutor_name ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-salmon'
                }`}
              />
              {errors.tutor_name && (
                <p className="text-xs text-red-500 mt-1">{errors.tutor_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                WhatsApp com DDD *
              </label>
              <input
                type="tel"
                placeholder="(19) 9XXXX-XXXX"
                value={formData.whatsapp}
                onChange={handlePhoneChange}
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all outline-none focus:ring-2 focus:ring-salmon/30 ${
                  errors.whatsapp ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-salmon'
                }`}
              />
              {errors.whatsapp && (
                <p className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>
              )}
            </div>
          </div>

          {/* Bloco 2: Sobre seu pet */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-[#FFF2CD] flex items-center justify-center text-[#D69E2E]">
                <PawPrint className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900">Sobre seu pet</h3>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Bairro em Campinas *
              </label>
              <div className="relative">
                <select
                  value={formData.neighborhood}
                  onChange={(e) => handleChange('neighborhood', e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-2xl border text-sm appearance-none bg-white transition-all outline-none focus:ring-2 focus:ring-salmon/30 ${
                    errors.neighborhood ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-salmon'
                  } ${!formData.neighborhood ? 'text-gray-400' : 'text-gray-900'}`}
                >
                  <option value="" disabled>Onde vocês moram?</option>
                  {CAMPINAS_NEIGHBORHOODS.map((bairro) => (
                    <option key={bairro} value={bairro} className="text-gray-900">
                      {bairro}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.neighborhood && (
                <p className="text-xs text-red-500 mt-1">{errors.neighborhood}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Ração que ele come hoje *
              </label>
              <input
                type="text"
                placeholder="Ex.: Premier Raças Pequenas 12kg"
                value={formData.current_pet_food}
                onChange={(e) => handleChange('current_pet_food', e.target.value)}
                className={`w-full px-4 py-3.5 rounded-2xl border text-sm transition-all outline-none focus:ring-2 focus:ring-salmon/30 ${
                  errors.current_pet_food ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-salmon'
                }`}
              />
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Não sabe o nome exato? Escreva do jeito que lembrar — a gente confirma no WhatsApp.
              </p>
              {errors.current_pet_food && (
                <p className="text-xs text-red-500 mt-1">{errors.current_pet_food}</p>
              )}
            </div>
          </div>
        </div>

        {/* Botão de Envio */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-salmon hover:bg-salmon-hover text-white font-bold text-base sm:text-lg rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span>Calculando plano...</span>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Receber Proposta Rápida no WhatsApp</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          🔒 Seus dados estão seguros. Sem ligações invasivas ou cobranças automáticas.
        </p>
      </form>
    </section>
  );
}
