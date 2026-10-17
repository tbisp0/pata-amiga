import React from 'react';
import { Settings } from 'lucide-react';

export default function Header({ onOpenAdmin }) {
  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full bg-salmon flex items-center justify-center text-white shadow-sm">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 7c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-salmon">
            Pata Amiga
          </span>
        </div>

        {/* Botão de Acesso ao Painel Admin */}
        <button
          onClick={onOpenAdmin}
          className="p-2 text-gray-500 hover:text-salmon hover:bg-baby-pink/30 rounded-full transition-colors"
          title="Painel Administrativo"
          aria-label="Abrir Painel Administrativo"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
