// Telefone padrão oficial de atendimento da Pata Amiga (configurável)
export const DEFAULT_WHATSAPP_NUMBER = '5519998765432';

/**
 * Sanitiza telefone deixando apenas dígitos e garantindo o código 55 do Brasil
 */
export function sanitizePhone(phone) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('55')) {
    return digits;
  }
  return `55${digits}`;
}

/**
 * Aplica máscara de visualização padrão brasileira: (19) 9XXXX-XXXX
 */
export function formatPhoneMask(value) {
  if (!value) return '';
  const digits = value.replace(/\D/g, '').slice(0, 11);
  
  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
  }
  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

/**
 * Gera link wa.me para o cliente chamar a empresa após submeter o formulário
 */
export function getClientInitiatedWhatsAppUrl(lead, businessPhone = DEFAULT_WHATSAPP_NUMBER) {
  const tutor = lead.tutor_name || 'Tutor';
  const food = lead.current_pet_food || 'Ração';
  const neighborhood = lead.neighborhood || 'Campinas';
  
  const text = `Olá equipe Pata Amiga! Sou o(a) ${tutor} e acabei de enviar meus dados no site. Meu pet come ${food} e moramos no ${neighborhood}. Gostaria de ver minha proposta!`;
  return `https://wa.me/${sanitizePhone(businessPhone)}?text=${encodeURIComponent(text)}`;
}

/**
 * Gera link wa.me para o administrador iniciar contato com o lead a partir do painel
 */
export function getAdminContactWhatsAppUrl(lead) {
  const phone = sanitizePhone(lead.whatsapp);
  const tutor = lead.tutor_name || 'Tutor';
  const food = lead.current_pet_food || 'sua ração habitual';
  const neighborhood = lead.neighborhood || 'seu bairro';
  
  const text = `Olá ${tutor}! Aqui é da Pata Amiga. Vi que você mora no ${neighborhood} e seu pet consome ${food}. Para eu calcular a quantidade mensal exata e separar um mimo artesanal de cortesia, qual o porte/peso aproximado dele?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/**
 * Gera texto estruturado de proposta comercial para copiar e colar no WhatsApp
 */
export function getProposalTemplate(lead, monthlyValue = '189,90', weekday = 'Quinta-feira') {
  return `🐾 *Proposta Pata Amiga — ${lead.tutor_name}*
📦 *Ração:* ${lead.current_pet_food}
🎁 *Mimo:* Pacote de petiscos 100% naturais desidratados
🚚 *Rota semanal no ${lead.neighborhood}:* Toda ${weekday} na portaria do condomínio (Frete Zero)
💳 *Valor do Plano Mensal:* R$ ${monthlyValue} (sem travar limite do cartão ou via Pix)

Podemos confirmar sua primeira entrega para esta semana?`;
}
