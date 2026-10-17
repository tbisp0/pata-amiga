import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  AlertCircle,
  UserCheck,
  Truck,
  Bell,
  PauseCircle,
  XCircle,
  Wallet,
  Plus,
  RotateCcw
} from 'lucide-react';
import LeadsTable from './LeadsTable';
import ClientsTable from './ClientsTable';
import ManualClientModal from './ManualClientModal';

export default function AdminDashboard({
  leads,
  subscriptions,
  onUpdateLead,
  onConvertLead,
  onAddManualSubscription,
  onUpdateSubscription,
  onBackToSite,
  onResetDemo
}) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [leadToConvert, setLeadToConvert] = useState(null);

  // Cálculos de métricas
  const newLeadsCount = leads.filter(l => l.status === 'novo_lead').length;
  const pendingLeadsCount = leads.filter(l => l.status !== 'assinatura_ativa' && l.status !== 'perdido').length;
  const activeSubs = subscriptions.filter(s => s.status === 'ativo');
  const activeSubsCount = activeSubs.length;
  const pausedCount = subscriptions.filter(s => s.status === 'pausado').length;
  const canceledCount = subscriptions.filter(s => s.status === 'cancelado').length;
  
  const mrr = activeSubs.reduce((acc, curr) => acc + (Number(curr.monthly_value) || 0), 0);

  const kpiCards = [
    {
      title: 'Novos leads',
      value: newLeadsCount,
      icon: Users,
      iconBg: 'bg-[#FCE8EB]',
      iconColor: 'text-[#E53E3E]',
    },
    {
      title: 'Leads pendentes',
      value: pendingLeadsCount,
      icon: AlertCircle,
      iconBg: 'bg-[#FFF2CD]',
      iconColor: 'text-[#D69E2E]',
    },
    {
      title: 'Clientes ativos',
      value: activeSubsCount,
      icon: UserCheck,
      iconBg: 'bg-[#C6F6D5]',
      iconColor: 'text-[#22543D]',
    },
    {
      title: 'Próximas entregas (14d)',
      value: activeSubsCount,
      icon: Truck,
      iconBg: 'bg-[#FCE8EB]',
      iconColor: 'text-salmon',
    },
    {
      title: 'Lembretes pendentes',
      value: activeSubsCount,
      icon: Bell,
      iconBg: 'bg-[#FFF2CD]',
      iconColor: 'text-[#D69E2E]',
    },
    {
      title: 'Pausados',
      value: pausedCount,
      icon: PauseCircle,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-500',
    },
    {
      title: 'Cancelados',
      value: canceledCount,
      icon: XCircle,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-500',
    },
    {
      title: 'Faturamento mensal (MRR)',
      value: `R$ ${mrr.toFixed(2).replace('.', ',')}`,
      icon: Wallet,
      iconBg: 'bg-[#C6F6D5]',
      iconColor: 'text-[#22543D]',
      highlight: true
    },
  ];

  const handleOpenConvert = (lead) => {
    setLeadToConvert(lead);
    setIsManualModalOpen(true);
  };

  const handleSaveModal = (data) => {
    if (leadToConvert) {
      onConvertLead(leadToConvert.id, data);
      setLeadToConvert(null);
    } else {
      onAddManualSubscription(data);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#2D3748]">
      {/* Barra de Navegação Superior */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="p-2 text-gray-500 hover:text-salmon hover:bg-gray-100 rounded-full transition-colors"
              title="Voltar para a Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Abas Superiores */}
            <nav className="flex items-center gap-1 sm:gap-2">
              {['Dashboard', 'Leads', 'Clientes', 'Entregas'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    activeTab === tab
                      ? 'bg-salmon text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetDemo}
              className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors text-xs flex items-center gap-1"
              title="Restaurar dados de demonstração"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Cabeçalho da Página */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              {activeTab}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Operação hiperlocal de Campinas · Controle de pedidos e rotas semanais
            </p>
          </div>

          <button
            onClick={() => {
              setLeadToConvert(null);
              setIsManualModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-salmon hover:bg-salmon-hover text-white font-bold text-sm rounded-2xl shadow-md transition-all active:scale-98 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Novo Assinante Manual</span>
          </button>
        </div>

        {/* Visão de Abas */}
        {activeTab === 'Dashboard' && (
          <div className="space-y-10">
            {/* Grade de 8 KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
              {kpiCards.map((kpi, idx) => {
                const Icon = kpi.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#FAD7DC]/60 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-full ${kpi.iconBg} ${kpi.iconColor} flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">
                        {kpi.title}
                      </p>
                      <h3 className={`text-2xl sm:text-3xl font-black ${kpi.highlight ? 'text-gray-900' : 'text-gray-900'}`}>
                        {kpi.value}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tabela Resumida: Últimos Leads Recebidos */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Últimos leads recebidos
                </h2>
                <button
                  onClick={() => setActiveTab('Leads')}
                  className="text-xs font-bold text-salmon hover:underline"
                >
                  Ver todos ({leads.length})
                </button>
              </div>

              <LeadsTable
                leads={leads.slice(0, 5)}
                onUpdateLead={onUpdateLead}
                onConvertLead={handleOpenConvert}
              />
            </div>
          </div>
        )}

        {activeTab === 'Leads' && (
          <div className="space-y-6">
            <LeadsTable
              leads={leads}
              onUpdateLead={onUpdateLead}
              onConvertLead={handleOpenConvert}
            />
          </div>
        )}

        {activeTab === 'Clientes' && (
          <div className="space-y-6">
            <ClientsTable
              subscriptions={subscriptions}
              onUpdateSubscription={onUpdateSubscription}
            />
          </div>
        )}

        {activeTab === 'Entregas' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rota Quinta-feira */}
              <div className="bg-white border border-[#FAD7DC] rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-salmon" />
                    <h3 className="font-extrabold text-lg text-gray-900">
                      Rota Quinta-feira (Cambuí, Taquaral, Mansões)
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-[#EBF8F3] text-green-800 px-3 py-1 rounded-full">
                    {subscriptions.filter(s => s.delivery_weekday === 'Quinta-feira' && s.status === 'ativo').length} entregas
                  </span>
                </div>
                <div className="space-y-3">
                  {subscriptions
                    .filter(s => s.delivery_weekday === 'Quinta-feira' && s.status === 'ativo')
                    .map(sub => (
                      <div key={sub.id} className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-gray-900">{sub.tutor_name} ({sub.pet_name})</div>
                          <div className="text-xs text-gray-500">{sub.neighborhood} · {sub.pet_food}</div>
                        </div>
                        <span className="text-xs font-bold text-salmon">🎁 Mimo ok</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Rota Terça-feira */}
              <div className="bg-white border border-[#FAD7DC] rounded-3xl p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-salmon" />
                    <h3 className="font-extrabold text-lg text-gray-900">
                      Rota Terça-feira (Barão Geraldo, Chapadão)
                    </h3>
                  </div>
                  <span className="text-xs font-bold bg-[#EBF8F3] text-green-800 px-3 py-1 rounded-full">
                    {subscriptions.filter(s => s.delivery_weekday === 'Terça-feira' && s.status === 'ativo').length} entregas
                  </span>
                </div>
                <div className="space-y-3">
                  {subscriptions
                    .filter(s => s.delivery_weekday === 'Terça-feira' && s.status === 'ativo')
                    .map(sub => (
                      <div key={sub.id} className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                        <div>
                          <div className="font-bold text-sm text-gray-900">{sub.tutor_name} ({sub.pet_name})</div>
                          <div className="text-xs text-gray-500">{sub.neighborhood} · {sub.pet_food}</div>
                        </div>
                        <span className="text-xs font-bold text-salmon">🎁 Mimo ok</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Manual de Assinante / Conversão */}
      <ManualClientModal
        isOpen={isManualModalOpen}
        onClose={() => {
          setIsManualModalOpen(false);
          setLeadToConvert(null);
        }}
        onSave={handleSaveModal}
        initialData={leadToConvert}
      />
    </div>
  );
}
