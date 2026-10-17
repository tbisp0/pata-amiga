import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER, sanitizePhone } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    const text = 'Olá equipe Pata Amiga! Gostaria de tirar uma dúvida sobre a assinatura de ração e mimos para o meu pet em Campinas.';
    const url = `https://wa.me/${sanitizePhone(DEFAULT_WHATSAPP_NUMBER)}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#A8E6CF] hover:bg-[#93DEC2] text-[#1D5E48] flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200"
      title="Falar no WhatsApp com a Pata Amiga"
      aria-label="Abrir WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-current" />
    </button>
  );
}
