# PRD e Especificação Técnica: Pata Amiga (MVP de Assinatura Local)

Construa uma aplicação completa em React, Tailwind CSS e Supabase para validação do serviço de assinatura de ração e petiscos artesanais "Pata Amiga", com atuação inicial hiperlocal em Campinas/SP.

---

## 1. Identidade Visual e Estilo
- **Nome da Solução:** Pata Amiga
- **Paleta de Cores Obrigatória:**
  - Salmão: `#FF7F66` (ações principais, destaques, botões primários)
  - Rosa Bebê: `#FDE2E4` (fundos secundários, chips, cartões suaves)
  - Amarelinho: `#FFF1C5` (alertas leves, selos de destaque, badges de status)
  - Verde Água: `#A8E6CF` (indicadores de sucesso, botão flutuante de WhatsApp, ações secundárias)
  - Fundo Geral: Off-white neutro (`#FDFDFD`) com tipografia escura legível (`#2D3748`).
- **Tom de Design:** Acolhedor, moderno, mobile-first, focado em alta conversão e atendimento humanizado de proximidade.

---

## 2. Estrutura da Interface

### A. Cabeçalho (Header)
- Logotipo estilizado: **Pata Amiga** (com ícone sutil de patinha ou coração).
- No **canto superior direito**, adicione um ícone discreto de **Engrenagem** que abre um modal ou navega para a rota `/admin` (Painel Administrativo).

### B. Landing Page (Visão do Tutor / Cliente)
1. **Hero Section:**
   - Título direto: "Ração e petiscos naturais entregues no seu condomínio sem peso e sem esquecimento".
   - Subtítulo: "Entrega programada em Campinas com preço justo de balcão e petiscos artesanais de mimo em cada entrega."
   - Botão de Ação Primário (Salmão): "Receber proposta no WhatsApp" (com âncora suave para o formulário).

2. **Como Funciona (3 Passos):**
   - Passo 1: **Informe a ração e o bairro** (em menos de 1 minuto).
   - Passo 2: **Receba a proposta no WhatsApp** com cálculo de consumo e sugestão de mimo natural.
   - Passo 3: **Entrega na porta do seu condomínio** na rota semanal do seu bairro, sem custo extra de frete.

3. **Formulário de Alta Conversão (4 Campos Essenciais):**
   - **Nome completo do tutor:** texto simples.
   - **WhatsApp com DDD:** máscara e validação de telefone celular brasileiro `(19) 9XXXX-XXXX`.
   - **Bairro em Campinas:** seletor com principais bairros de condomínios (Cambuí, Taquaral, Mansões Santo Antônio, Guanabara, Barão Geraldo, Nova Campinas, Bosque, Parque Prado, Sousas, Outro).
   - **Ração atual do pet:** campo de texto com placeholder orientador (ex.: *"Premier Raças Pequenas 12kg"* ou *"Golden Gatos Castrados"*).
   - **Botão de Envio (Salmão):** "Receber Proposta Rápida no WhatsApp".

4. **Pós-Envio (Feedback Visual e Prevenção de Conflito de Atendimento):**
   - Mensagem de sucesso em tom Verde Água destacando que o plano está sendo calculado.
   - Botão de destaque para o cliente abrir o WhatsApp imediatamente:
     - URL: `https://wa.me/{WHATSAPP_DA_EMPRESA}?text={MENSAGEM_CODIFICADA}`
     - Mensagem pré-formatada com identificação do lead:  
       `"Olá equipe Pata Amiga! Sou o(a) [Nome] e acabei de enviar meus dados no site. Meu pet come [Ração] e moramos no [Bairro]. Gostaria de ver minha proposta!"`
   - **Gatilho de Estado:** Ao clicar neste botão pós-envio, o sistema atualiza o registro no Supabase marcando a flag `client_initiated_chat: true`, sinalizando no painel administrativo que o tutor já puxou a conversa.

---

## 3. Painel Administrativo (Acesso via Rota `/admin` ou Engrenagem)

- Acesso protegido por PIN simples configurável (ex.: `1234`).
- **Métricas Rápidas no Topo:**
  - Total de Leads Recebidos.
  - Leads Aguardando Resposta (com indicador de SLA).
  - Assinaturas Ativas (Confirmadas).
  - Previsão de Faturamento Mensal (MRR acumulado).

- **Gestão de SLA e Fila de Atendimento:**
  - Indicador visual do tempo decorrido desde o envio do formulário:
    - Verde: menos de 10 minutos.
    - Amarelo: entre 10 e 20 minutos.
    - Vermelho piscante ou destacado: mais de 20 minutos sem contato iniciado.
  - Tag visual informativa: `"Cliente já chamou no WhatsApp"` quando `client_initiated_chat = true`.

- **Tabela de Leads Recebidos:**
  - Colunas: Tempo de Espera (SLA), Tutor, WhatsApp, Bairro, Ração Informada, Status, Ações Rápidas.
  - Badges de Status:
    - "Novo Lead" (Amarelinho)
    - "Em Conversa WhatsApp" (Salmão claro)
    - "Proposta Enviada" (Azul suave)
    - "Assinatura Ativa" (Verde Água)
    - "Perdido / Desistiu" (Cinza)

- **Ações Rápidas por Lead (Mecânica 100% wa.me sem custos de API):**
  1. **Botão 1: "Chamar no WhatsApp" (Abertura):**
     - Abre `https://wa.me/55{TELEFONE_SANITIZADO}?text={MENSAGEM_CONSULTORIA}`.
     - Texto pronto:  
       `"Olá [Nome]! Aqui é da Pata Amiga. Vi que você mora no [Bairro] e seu pet consome [Ração]. Para eu calcular a quantidade mensal exata e separar um mimo artesanal, qual o porte/peso aproximado dele?"`
     - **Automação imediata:** Ao clicar, atualiza automaticamente o status do lead para `"Em Conversa WhatsApp"`.
  2. **Botão 2: "Copiar Proposta Pronta" (Modal/Clipboard):**
     - Gera o texto estruturado para envio no WhatsApp com campos fáceis de preencher:
       ```text
       🐾 Proposta Pata Amiga — [Nome do Tutor]
       📦 Ração: [Ração]
       🎁 Mimo: Pacote de petiscos 100% naturais desidratados
       🚚 Rota semanal no [Bairro]: Toda [Quinta-feira] na portaria do condomínio (Frete Zero)
       💳 Valor do Plano Mensal: R$ [Valor] (sem travar limite do cartão ou via Pix)
       
       Podemos confirmar sua primeira entrega para esta semana?
       ```
  3. **Botão 3: "Converter em Assinante":**
     - Abre modal rápido para registrar valor mensal (R$), dia do vencimento/entrega e marcar como Assinante Ativo.

- **Cadastro Manual de Clientes:**
  - Botão "+ Novo Assinante Manual" para cadastrar indicações de condomínios captadas fora da web.

---

## 4. Backend e Banco de Dados (Supabase)

1. **Configurações Gerais:**
   - Variável pública ou tabela de configurações com o número oficial do WhatsApp da empresa (`WHATSAPP_SUPPORT_PHONE`, formato `55199XXXXXXXX`).

2. **Sanitização de Telefones:**
   - Todo telefone recebido no formulário deve ser salvo rigorosamente sanitizado (somente dígitos): `55` + DDD + 9 dígitos (ex.: `5519998765432`), garantindo links `wa.me` válidos tanto para desktop quanto para mobile.

3. **Tabelas:**
   - `leads_onboarding`:
     - `id` (uuid, primary key)
     - `created_at` (timestamp with timezone, default now())
     - `tutor_name` (text, not null)
     - `whatsapp` (text, not null, sanitizado para dígitos)
     - `neighborhood` (text, not null)
     - `current_pet_food` (text, not null)
     - `status` (text, default 'novo_lead')
     - `client_initiated_chat` (boolean, default false)
     - `first_contact_at` (timestamp with timezone, nullable)
     - `notes` (text, nullable)
   - `active_subscriptions`:
     - `id` (uuid, primary key)
     - `created_at` (timestamp with timezone, default now())
     - `lead_id` (uuid, foreign key para leads_onboarding, nullable)
     - `tutor_name` (text, not null)
     - `whatsapp` (text, not null)
     - `neighborhood` (text, not null)
     - `monthly_value` (numeric, not null)
     - `delivery_cycle` (text, default 'mensal')
     - `delivery_weekday` (text, default 'Quinta-feira')
     - `status` (text, default 'ativo')

4. **Regras de Acesso e Segurança (RLS):**
   - Inserção pública permitida na tabela `leads_onboarding` para submissão anônima da landing page.
   - Atualização da flag `client_initiated_chat` permitida por ID para quando o lead clica no botão pós-envio.
   - Leitura e gestão administrativa protegidas pela autenticação/PIN da rota `/admin`.
