# Dicionário de Dados - Projeto Conexão Cidadã

Um glossario da estrutura e regras do banco de dados para ajudar meus colegas (Principalmente os do BackEnd)
Última atualização: 24/09/2025

---

### Tabela: `usuarios`

- **Propósito:** Armazena todos os usuários do sistema, sejam Cidadãos ou Parlamentares. É a tabela central para autenticação e perfis.
- **Colunas:**

| Nome da Coluna | Tipo de Dado | Regras / Observações |
| :--- | :--- | :--- |
| `id` | `bigserial` | Chave Primária (PK). Auto-incremento. |
| `nome_completo` | `text` | Obrigatório (NOT NULL). |
| `email` | `text` | Obrigatório (NOT NULL), Único (UNIQUE). Usado para login. |
| `senha_hash` | `text` | Obrigatório (NOT NULL). **NUNCA** guardar a senha pura, apenas o hash. |
| `cpf` | `varchar(14)` | Obrigatório (NOT NULL), Único (UNIQUE). |
| `tipo_usuario` | `text` | Obrigatório (NOT NULL). Default: `'CIDADAO'`. Valores permitidos: 'CIDADAO', 'PARLAMENTAR'. |
| `data_criacao` | `timestamp` | Obrigatório (NOT NULL). Default: data e hora atuais. |

---

### Tabela: `demandas`

- **Propósito:** Armazena as solicitações (demandas) criadas pelos cidadãos.
- **Colunas:**

| Nome da Coluna | Tipo de Dado | Regras / Observações |
| :--- | :--- | :--- |
| `id` | `bigserial` | Chave Primária (PK). |
| `titulo` | `text` | Obrigatório (NOT NULL). |
| `descricao` | `text` | Obrigatório (NOT NULL). |
| `status` | `text` | Obrigatório. Default: `'ABERTA'`. Valores permitidos: 'ABERTA', 'EM_ANALISE', 'EM_EXECUCAO', 'CONCLUIDA', 'ARQUIVADA'. |
| `data_criacao` | `timestamp` | Obrigatório. Default: data e hora atuais. |
| `criador_id` | `bigint` | Chave Estrangeira (FK) para `usuarios.id`. Obrigatório. |
| `parlamentar_alvo_id` | `bigint` | Chave Estrangeira (FK) para `usuarios.id`. Pode ser nulo. |

---

### Tabela: `categorias`

- **Propósito:** Lista as categorias que podem ser usadas para classificar as demandas.
- **Colunas:**

| Nome da Coluna | Tipo de Dado | Regras / Observações |
| :--- | :--- | :--- |
| `id` | `serial` | Chave Primária (PK). |
| `nome` | `text` | Obrigatório (NOT NULL), Único (UNIQUE). |

---

### Tabela: `demanda_categorias`

- **Propósito:** Tabela de ligação (Join Table) que cria a relação Muitos-para-Muitos entre `demandas` e `categorias`.
- **Colunas:**

| Nome da Coluna | Tipo de Dado | Regras / Observações |
| :--- | :--- | :--- |
| `demanda_id` | `bigint` | Chave Primária Composta (PK), Chave Estrangeira (FK) para `demandas.id`. |
| `categoria_id` | `integer`| Chave Primária Composta (PK), Chave Estrangeira (FK) para `categorias.id`. |

---

### Tabela: `acoes_publicas`

- **Propósito:** Registra as ações concretas que os parlamentares realizam em resposta às demandas. Corresponde à "Gestão de Tarefas" da interface.
- **Colunas:**

| Nome da Coluna | Tipo de Dado | Regras / Observações |
| :--- | :--- | :--- |
| `id` | `bigserial` | Chave Primária (PK). |
| `titulo` | `text` | Obrigatório (NOT NULL). |
| `descricao` | `text` | Opcional (pode ser nulo). |
| `status` | `text` | Obrigatório. Default: `'PLANEJADA'`. Valores: 'PLANEJADA' (A Fazer), 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA'. |
| `prioridade` | `text` | Obrigatório. Default: `'Normal'`. Valores: 'Baixa', 'Normal', 'Alta', 'Urgente'. |
| `data_inicio` | `date` | Opcional. |
| `data_prevista_conclusao`| `date` | Opcional. |
| `data_conclusao_real`| `date` | Opcional. |
| `demanda_origem_id` | `bigint` | Chave Estrangeira (FK) para `demandas.id`. Obrigatório. |
| `responsavel_id` | `bigint` | Chave Estrangeira (FK) para `usuarios.id`. Obrigatório. |

---

### Tabela: `atualizacoes`

- **Propósito:** Armazena o histórico de comentários e atualizações de status para demandas e ações públicas.
- **Colunas:**

| Nome da Coluna | Tipo de Dado | Regras / Observações |
| :--- | :--- | :--- |
| `id` | `bigserial` | Chave Primária (PK). |
| `texto` | `text` | Obrigatório (NOT NULL). |
| `data_criacao` | `timestamp` | Obrigatório. Default: data e hora atuais. |
| `autor_id` | `bigint` | Chave Estrangeira (FK) para `usuarios.id`. Obrigatório. |
| `demanda_id` | `bigint` | Chave Estrangeira (FK) para `demandas.id`. Pode ser nulo. |
| `acao_publica_id` | `bigint` | Chave Estrangeira (FK) para `acoes_publicas.id`. Pode ser nulo. |