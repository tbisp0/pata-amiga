import React, { useState } from 'react';
import { useData } from './context/DataContext';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import OnboardingForm from './components/OnboardingForm';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import SuccessModal from './components/SuccessModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Heart } from 'lucide-react';

export default function App() {
  const {
    leads,
    subscriptions,
    addLead,
    updateLead,
    convertLeadToSubscription,
    addManualSubscription,
    updateSubscription,
    resetDemoData
  } = useData();

  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'admin'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const handleScrollToForm = () => {
    const el = document.getElementById('formulario');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (data) => {
    const newLead = addLead(data);
    setSubmittedLead(newLead);
  };

  const handleClientCalledWhatsApp = (leadId) => {
    updateLead(leadId, { client_initiated_chat: true });
  };

  // Se a rota for admin e o usuário não estiver autenticado
  if (currentView === 'admin' && !isAdminAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setIsAdminAuthenticated(true)}
        onBackToSite={() => setCurrentView('landing')}
      />
    );
  }

  // Se a rota for admin e o usuário já estiver autenticado
  if (currentView === 'admin' && isAdminAuthenticated) {
    return (
      <AdminDashboard
        leads={leads}
        subscriptions={subscriptions}
        onUpdateLead={updateLead}
        onConvertLead={convertLeadToSubscription}
        onAddManualSubscription={addManualSubscription}
        onUpdateSubscription={updateSubscription}
        onBackToSite={() => setCurrentView('landing')}
        onResetDemo={resetDemoData}
      />
    );
  }

  // Visualização Padrão: Landing Page do Tutor
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col justify-between">
      <div>
        <Header onOpenAdmin={() => setCurrentView('admin')} />
        
        <main>
          <Hero onScrollToForm={handleScrollToForm} />
          <HowItWorks />
          <Testimonials />
          <OnboardingForm onSubmitSuccess={handleFormSubmit} />
        </main>
      </div>

      {/* Botão Flutuante de WhatsApp */}
      <FloatingWhatsApp />

      {/* Modal de Sucesso Pós-Envio */}
      <SuccessModal
        lead={submittedLead}
        onClose={() => setSubmittedLead(null)}
        onClientCalledWhatsApp={handleClientCalledWhatsApp}
      />

      {/* Rodapé Acolhedor */}
      <footer className="w-full bg-white border-t border-gray-100 py-10 px-4 text-center text-xs text-gray-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-1.5 font-bold text-gray-700 text-sm">
            <span>Pata Amiga</span>
            <span>·</span>
            <span>Campinas/SP</span>
          </div>
          <p className="max-w-md mx-auto text-gray-400 leading-relaxed">
            Assinatura hiperlocal com entrega programada em condomínios de Campinas. Preço justo de balcão e petiscos 100% naturais de mimo.
          </p>
          <div className="pt-2 text-gray-400 flex items-center justify-center gap-1 text-[11px]">
            <span>Feito com</span>
            <Heart className="w-3 h-3 fill-salmon text-salmon" />
            <span>para cães, gatos e tutores felizes.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
