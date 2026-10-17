import React from 'react';
import { Heart } from 'lucide-react';

export default function Hero({ onScrollToForm }) {
  return (
    <section className="w-full bg-[#FDECEE] py-10 md:py-16 px-4 border-b border-baby-pink-border/50">
      <div className="max-w-3xl mx-auto flex flex-col items-start text-left">
        {/* Badge Campinas */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-light-yellow text-[#B7791F] text-xs md:text-sm font-semibold mb-5 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-current text-[#E53E3E]" />
          <span>Atendimento local em Campinas/SP</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A202C] leading-[1.2] tracking-tight mb-4">
          Ração e petiscos naturais entregues no seu condomínio sem peso e sem esquecimento
        </h1>

        {/* Subtítulo */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl leading-relaxed">
          Entrega programada em Campinas com preço justo de balcão e petiscos artesanais de mimo em cada entrega.
        </p>

        {/* Botão de Ação Primário */}
        <button
          onClick={onScrollToForm}
          className="w-full sm:w-auto px-8 py-4 bg-salmon hover:bg-salmon-hover text-white font-bold text-base md:text-lg rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform active:scale-98"
        >
          Receber proposta no WhatsApp
        </button>
      </div>
    </section>
  );
}
