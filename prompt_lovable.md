# PRD e Especificação Técnica: auFOOD (MVP de Assinatura Local)

Construa uma aplicação completa em React, Tailwind CSS e Supabase para validação do serviço de assinatura de ração e petiscos "auFOOD", atuando inicialmente em Campinas/SP.

---

## 1. Identidade Visual e Estilo
- **Nome da Solução:** auFOOD
- **Paleta de Cores Obrigatória:**
  - Salmão: `#FF7F66` (ações principais, destaques, botões primários)
  - Rosa Bebê: `#FDE2E4` (fundos secundários, chips, cartões suaves)
  - Amarelinho: `#FFF1C5` (alertas leves, selos de destaque, badges de status)
  - Verde Água: `#A8E6CF` (indicadores de sucesso, botão flutuante de WhatsApp, ações secundárias)
  - Fundo Geral: Off-white neutro (`#FDFDFD`) com tipografia escura legível (`#2D3748`).
- **Tom de Design:** Limpo, moderno, mobile-first, acolhedor e focado em alta conversão sem atrito.

---

## 2. Estrutura da Interface

### A. Cabeçalho (Header)
- Logotipo com texto estilizado: **auFOOD**.
- No **canto superior direito**, adicione um ícone discreto de **Engrenagem** que abre um modal ou navega para a rota `/admin` (Painel Administrativo).

### B. Landing Page (Visão do Tutor / Cliente)
1. **Hero Section:**
   - Título direto: "Ração e petiscos para o seu pet sem peso e sem esquecimento em Campinas".
   - Subtítulo focado em comodidade e flexibilidade total.
   - Botão de Ação Primário (Salmão): "Montar plano do meu pet" (com âncora para o formulário).
2. **Como Funciona (3 Passos):**
   - Passo 1: Conte sobre a rotina alimentar do seu cão ou gato.
   - Passo 2: Receba uma proposta de plano mensal personalizada diretamente no seu WhatsApp.
   - Passo 3: Entrega programada no seu condomínio com petiscos naturais de mimo.
3. **Formulário de Onboarding ("Montar Plano do Meu Pet"):**
   - Nome completo do tutor.
   - Telefone celular com DDD (WhatsApp).
   - E-mail.
   - Bairro de Campinas (seleção com bairros como Cambuí, Taquaral, Mansões Santo Antônio, Guanabara, Barão Geraldo, etc., ou campo "Outro").
   - Tipo de Pet (Cachorro ou Gato).
   - Nome, Porte/Peso aproximado (kg) e Idade do Pet.
   - Marca atual de ração consumida.
   - Frequência habitual de compra (Quinzenal, Mensal, Bimestral).
   - Gasto mensal aproximado com alimentação e petiscos (R$).
   - Botão de envio (Salmão): "Enviar e receber proposta no WhatsApp".
4. **Pós-Envio (Feedback Visual):**
   - Mensagem de sucesso em tom Verde Água informando que o plano está sendo calculado e a equipe entrará em contato via WhatsApp em minutos.
   - Botão alternativo com link direto `api.whatsapp.com/send` com mensagem pronta ("Olá equipe auFOOD, acabei de preencher o formulário para o meu pet...").

---

## 3. Painel Administrativo (Acesso via Engrenagem no Topo)

- Rota ou Modal protegido por senha simples de acesso (ex.: PIN padrão configurável).
- **Métricas Rápidas no Topo:**
  - Total de Leads Recebidos.
  - Clientes Ativos (Assinaturas confirmadas manualmente).
  - Previsão de Faturamento Mensal (MRR manual).
- **Tabela de Leads / Formulários Recebidos:**
  - Colunas: Data, Tutor, Bairro, Pet (Espécie/Peso), Ração Atual, Gasto Estimado, Status.
  - Badges de Status: "Novo Lead" (Amarelinho), "Em Contato WhatsApp", "Plano Enviado", "Assinatura Ativa" (Verde Água), "Perdido".
  - Ação Direta por Linha: Botão com ícone de WhatsApp que abre direto a conversa com o cliente usando o número informado, com template de mensagem já preenchido.
  - Ação de Edição: Capacidade de alterar o status e marcar manualmente o cliente como "Assinante Ativo" e registrar o valor acordado.
- **Formulário Manual de Inserção de Assinante:**
  - Botão "Novo Cliente Manual" para cadastrar tutores captados fora do formulário web.

---

## 4. Backend e Integração Cloud (Lovable / Supabase)

1. **Tabelas do Banco de Dados:**
   - `leads_onboarding`: guarda todos os dados preenchidos no formulário pelo cliente.
   - `subscriptions_manual`: guarda os registros de clientes confirmados (tutor, pet, valor mensal, ciclo de entrega, data de vencimento).
2. **Disparo de Alerta por E-mail:**
   - Configure uma Supabase Edge Function vinculada a um trigger na tabela `leads_onboarding` (usando Resend API) para enviar um e-mail imediato ao administrador notificando: *"Novo plano solicitado por [Nome do Tutor] no bairro [Bairro] - auFOOD"*.
3. **Persistência de Dados:**
   - Todos os envios do formulário do cliente devem ser salvos diretamente no Supabase em tempo real com validação de campos obrigatórios.