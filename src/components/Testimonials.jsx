import React from 'react';
import { Star, PawPrint } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      avatarBg: 'bg-[#FFF2CD]',
      avatarText: 'text-[#D69E2E]',
      type: 'dog',
      stars: 5,
      quote: '“Au! Minha ração chegou antes do potinho ficar vazio. Atendimento aprovado com abanar de rabo.”',
      author: 'Thor',
      role: 'especialista em farejar entregas'
    },
    {
      avatarBg: 'bg-[#C6F6D5]',
      avatarText: 'text-[#22543D]',
      type: 'cat',
      stars: 5,
      quote: '“Finalmente humanos organizados. Meus petiscos chegaram no dia certo. Continuem assim.”',
      author: 'Mia',
      role: 'auditora oficial de petiscos'
    },
    {
      avatarBg: 'bg-[#FED7D7]',
      avatarText: 'text-[#C53030]',
      type: 'dog',
      stars: 5,
      quote: '“Toda quinta tem cheirinho de mimo novo na portaria. Meu tutor parou de carregar saco pesado!”',
      author: 'Bolinha',
      role: 'fiscal da portaria do condomínio'
    }
  ];

  return (
    <section className="w-full bg-[#EBF8F3] py-14 px-4 border-y border-[#D2F2E4]">
      <div className="max-w-5xl mx-auto">
        {/* Cabeçalho da Seção */}
        <div className="text-center md:text-left mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-salmon uppercase tracking-wider mb-2">
            <PawPrint className="w-4 h-4" />
            <span>PETS SATISFEITOS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1A202C] mb-2">
            Quem já recebeu Pata Amiga aprovou
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Entrega pontual, potinho cheio e pet feliz.
          </p>
        </div>

        {/* Grade de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 shadow-xs border border-white hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Cabeçalho do Card: Ícone + Estrelas */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-full ${item.avatarBg} ${item.avatarText} flex items-center justify-center font-bold text-xl`}>
                    {item.type === 'cat' ? '🐱' : '🐶'}
                  </div>
                  <div className="flex items-center text-salmon gap-0.5">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Depoimento */}
                <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                  {item.quote}
                </p>
              </div>

              {/* Tag do Autor */}
              <div className="inline-block bg-[#F7FAFC] border border-gray-100 rounded-full px-3.5 py-1 text-xs text-gray-600 self-start">
                <strong className="text-gray-900">{item.author}</strong> · {item.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
