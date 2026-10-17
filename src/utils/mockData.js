export const INITIAL_LEADS = [
  {
    id: 'lead-1',
    created_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(), // 8 minutos atrás (Verde <10m)
    tutor_name: 'Mariana Costa',
    whatsapp: '19988112233',
    neighborhood: 'Cambuí',
    current_pet_food: 'Premier Raças Pequenas 12kg',
    status: 'novo_lead',
    client_initiated_chat: true,
    first_contact_at: null,
    notes: 'Mora no Condomínio Splendor. Cãozinho Shih-tzu de 4 anos.'
  },
  {
    id: 'lead-2',
    created_at: new Date(Date.now() - 16 * 60 * 1000).toISOString(), // 16 minutos atrás (Amarelo 10-20m)
    tutor_name: 'Rodrigo Almeida',
    whatsapp: '19997223344',
    neighborhood: 'Taquaral',
    current_pet_food: 'Golden Gatos Castrados 10kg',
    status: 'em_conversa',
    client_initiated_chat: false,
    first_contact_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    notes: '2 gatos persas. Interessado em petiscos naturais de frango.'
  },
  {
    id: 'lead-3',
    created_at: new Date(Date.now() - 48 * 60 * 1000).toISOString(), // 48 minutos atrás (Vermelho >20m)
    tutor_name: 'Camila Guimarães',
    whatsapp: '19981445566',
    neighborhood: 'Mansões Santo Antônio',
    current_pet_food: 'Royal Canin Golden Retriever 15kg',
    status: 'proposta_enviada',
    client_initiated_chat: false,
    first_contact_at: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    notes: 'Proposta de R$ 289,00 enviada no WhatsApp com pacote de orelhas desidratadas.'
  }
];

export const INITIAL_SUBSCRIPTIONS = [
  {
    id: 'sub-1',
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    tutor_name: 'Carlos Eduardo Silva',
    whatsapp: '19991234567',
    neighborhood: 'Cambuí',
    pet_name: 'Thor',
    pet_type: 'Cachorro',
    pet_food: 'Premier Ambientes Internos 12kg',
    monthly_value: 239.90,
    delivery_cycle: 'mensal',
    delivery_weekday: 'Quinta-feira',
    next_delivery: '2026-10-22',
    status: 'ativo',
    include_treats: true
  },
  {
    id: 'sub-2',
    created_at: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    tutor_name: 'Beatriz Mendonça',
    whatsapp: '19987654321',
    neighborhood: 'Mansões Santo Antônio',
    pet_name: 'Mia',
    pet_type: 'Gato',
    pet_food: 'Biofresh Gatos Salmão 7.5kg',
    monthly_value: 195.00,
    delivery_cycle: 'mensal',
    delivery_weekday: 'Quinta-feira',
    next_delivery: '2026-10-22',
    status: 'ativo',
    include_treats: true
  },
  {
    id: 'sub-3',
    created_at: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
    tutor_name: 'Lucas Ferreira',
    whatsapp: '19992345678',
    neighborhood: 'Barão Geraldo',
    pet_name: 'Bolinha',
    pet_type: 'Cachorro',
    pet_food: 'Fórmula Natural Fresh Meat 15kg',
    monthly_value: 310.00,
    delivery_cycle: 'a cada 45 dias',
    delivery_weekday: 'Terça-feira',
    next_delivery: '2026-10-27',
    status: 'ativo',
    include_treats: true
  }
];

export const CAMPINAS_NEIGHBORHOODS = [
  'Cambuí',
  'Taquaral',
  'Mansões Santo Antônio',
  'Guanabara',
  'Barão Geraldo',
  'Nova Campinas',
  'Bosque',
  'Parque Prado',
  'Sousas',
  'Chácara da Barra',
  'Jardim Chapadão',
  'Outro bairro de Campinas'
];
