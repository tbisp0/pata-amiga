import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_LEADS, INITIAL_SUBSCRIPTIONS } from '../utils/mockData';
import { sanitizePhone } from '../utils/whatsapp';

const DataContext = createContext();

const LEADS_STORAGE_KEY = 'pata_amiga_leads_v1';
const SUBS_STORAGE_KEY = 'pata_amiga_subs_v1';
const SETTINGS_STORAGE_KEY = 'pata_amiga_settings_v1';

export function DataProvider({ children }) {
  const [leads, setLeads] = useState(() => {
    try {
      const saved = localStorage.getItem(LEADS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem(SUBS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
    } catch {
      return INITIAL_SUBSCRIPTIONS;
    }
  });

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        whatsappNumber: '5519990137380',
        adminEmail: 'atendimento@pataamiga.com.br',
        reminderDaysBefore: 3
      };
    } catch {
      return {
        whatsappNumber: '5519990137380',
        adminEmail: 'atendimento@pataamiga.com.br',
        reminderDaysBefore: 3
      };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Erro ao salvar leads no localStorage:', e);
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem(SUBS_STORAGE_KEY, JSON.stringify(subscriptions));
    } catch (e) {
      console.error('Erro ao salvar assinaturas no localStorage:', e);
    }
  }, [subscriptions]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Erro ao salvar configurações no localStorage:', e);
    }
  }, [settings]);

  // Adicionar novo lead vindo do formulário
  const addLead = (leadInput) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      created_at: new Date().toISOString(),
      tutor_name: leadInput.tutor_name.trim(),
      whatsapp: sanitizePhone(leadInput.whatsapp),
      neighborhood: leadInput.neighborhood,
      current_pet_food: leadInput.current_pet_food.trim(),
      status: 'novo_lead',
      client_initiated_chat: false,
      first_contact_at: null,
      notes: ''
    };
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  // Atualizar propriedades de um lead
  const updateLead = (id, updates) => {
    setLeads(prev => prev.map(lead => {
      if (lead.id === id) {
        return { ...lead, ...updates };
      }
      return lead;
    }));
  };

  // Converter lead em assinante ativo
  const convertLeadToSubscription = (leadId, subData) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    const newSub = {
      id: `sub-${Date.now()}`,
      created_at: new Date().toISOString(),
      lead_id: leadId,
      tutor_name: lead.tutor_name,
      whatsapp: lead.whatsapp,
      neighborhood: lead.neighborhood,
      pet_name: subData.pet_name || 'Pet',
      pet_type: subData.pet_type || 'Cachorro',
      pet_food: subData.pet_food || lead.current_pet_food,
      monthly_value: parseFloat(subData.monthly_value) || 199.90,
      delivery_cycle: subData.delivery_cycle || 'mensal',
      delivery_weekday: subData.delivery_weekday || 'Quinta-feira',
      next_delivery: subData.next_delivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'ativo',
      include_treats: subData.include_treats ?? true
    };

    setSubscriptions(prev => [newSub, ...prev]);
    updateLead(leadId, { status: 'assinatura_ativa' });
  };

  // Adicionar assinante manualmente (captação externa/condomínio)
  const addManualSubscription = (subData) => {
    const newSub = {
      id: `sub-${Date.now()}`,
      created_at: new Date().toISOString(),
      lead_id: null,
      tutor_name: subData.tutor_name.trim(),
      whatsapp: sanitizePhone(subData.whatsapp),
      neighborhood: subData.neighborhood,
      pet_name: subData.pet_name || 'Pet',
      pet_type: subData.pet_type || 'Cachorro',
      pet_food: subData.pet_food,
      monthly_value: parseFloat(subData.monthly_value) || 199.90,
      delivery_cycle: subData.delivery_cycle || 'mensal',
      delivery_weekday: subData.delivery_weekday || 'Quinta-feira',
      next_delivery: subData.next_delivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'ativo',
      include_treats: subData.include_treats ?? true
    };
    setSubscriptions(prev => [newSub, ...prev]);
  };

  // Atualizar assinante existente
  const updateSubscription = (id, updates) => {
    setSubscriptions(prev => prev.map(sub => {
      if (sub.id === id) {
        return { ...sub, ...updates };
      }
      return sub;
    }));
  };

  // Reset para estado de demonstração
  const resetDemoData = () => {
    setLeads(INITIAL_LEADS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    localStorage.removeItem(LEADS_STORAGE_KEY);
    localStorage.removeItem(SUBS_STORAGE_KEY);
  };

  return (
    <DataContext.Provider value={{
      leads,
      subscriptions,
      settings,
      setSettings,
      addLead,
      updateLead,
      convertLeadToSubscription,
      addManualSubscription,
      updateSubscription,
      resetDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
