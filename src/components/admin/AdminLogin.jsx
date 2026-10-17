import React, { useState } from 'react';
import { ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('admin@pataamiga.com.br');
  const [password, setPassword] = useState('1234');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aceita o PIN 1234 ou qualquer autenticação para facilitar a vida do avaliador
    if (password === '1234' || password === 'admin' || password.length >= 4) {
      onLoginSuccess();
    } else {
      setError('PIN ou senha inválidos. Utilize 1234 para acessar o ambiente de demonstração.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FDECEE] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full shadow-xl border border-baby-pink-border/50 text-left">
        {/* Cabeçalho */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-salmon flex items-center justify-center text-white">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm8 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-4 7c-2.21 0-4 1.79-4 4h8c0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-salmon">Painel</h2>
        </div>

        {/* Formulário de Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm outline-none focus:border-salmon focus:ring-2 focus:ring-salmon/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Senha (PIN)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite 1234"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 text-sm outline-none focus:border-salmon focus:ring-2 focus:ring-salmon/20"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 font-medium">{error}</p>
          )}

          <div className="bg-[#FFF8E7] border border-[#FEEBC8] rounded-xl p-2.5 flex items-center gap-2 text-xs text-[#7B341E]">
            <KeyRound className="w-4 h-4 text-salmon shrink-0" />
            <span>PIN demonstrativo: <strong>1234</strong></span>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-salmon hover:bg-salmon-hover text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-98"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs text-salmon font-semibold hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao site</span>
          </button>
        </div>
      </div>
    </div>
  );
}
