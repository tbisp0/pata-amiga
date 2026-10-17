import React from 'react';
import { ClipboardList, MessageCircle, Truck } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: 'Passo 1',
      title: 'Informe a ração e o bairro',
      description: 'Em menos de 1 minuto.',
      icon: ClipboardList,
    },
    {
      number: 'Passo 2',
      title: 'Receba a proposta no WhatsApp',
      description: 'Com cálculo de consumo e sugestão de mimo natural.',
      icon: MessageCircle,
    },
    {
      number: 'Passo 3',
      title: 'Entrega na porta do seu condomínio',
      description: 'Na rota semanal do seu bairro, sem custo extra de frete.',
      icon: Truck,
    },
  ];

  return (
    <section className="w-full py-12 px-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white border border-[#FAD7DC] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-full bg-[#FCE8EB] flex items-center justify-center text-salmon mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-salmon uppercase tracking-wider mb-1">
                {step.number}
              </span>
              <h3 className="text-xl font-bold text-[#1A202C] mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
