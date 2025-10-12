-- =================================================================
-- SCHEMA V1 DO BANCO DE DADOS - PROJETO CONEXÃO CIDADÃ
-- Arquivo mestre para criação da estrutura inicial do banco.
-- Execute este script em um banco de dados PostgreSQL vazio.
-- =================================================================

-- Tabela 1: Usuarios (Cidadãos e Parlamentares)
CREATE TABLE IF NOT EXISTS public.usuarios
(
    id bigserial NOT NULL,
    nome_completo text NOT NULL,
    email text NOT NULL UNIQUE,
    senha_hash text NOT NULL,
    cpf character varying(14) NOT NULL UNIQUE,
    tipo_usuario text NOT NULL DEFAULT 'CIDADAO',
    data_criacao timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Tabela 2: Demandas (Solicitações dos Cidadãos)
CREATE TABLE IF NOT EXISTS public.demandas
(
    id bigserial NOT NULL,
    titulo text NOT NULL,
    descricao text NOT NULL,
    status text NOT NULL DEFAULT 'ABERTA' CHECK (status IN ('ABERTA', 'EM_ANALISE', 'EM_EXECUCAO', 'CONCLUIDA', 'ARQUIVADA')),
    data_criacao timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    criador_id bigint NOT NULL,
    parlamentar_alvo_id bigint,
    PRIMARY KEY (id),
    CONSTRAINT fk_criador FOREIGN KEY (criador_id) REFERENCES public.usuarios (id),
    CONSTRAINT fk_parlamentar_alvo FOREIGN KEY (parlamentar_alvo_id) REFERENCES public.usuarios (id)
);

-- Tabela 3: Categorias (Tags para as Demandas)
CREATE TABLE IF NOT EXISTS public.categorias
(
    id serial NOT NULL,
    nome text NOT NULL UNIQUE,
    PRIMARY KEY (id)
);

-- Tabela 4: Demanda_Categorias (Tabela de Ligação N-N)
CREATE TABLE IF NOT EXISTS public.demanda_categorias
(
    demanda_id bigint NOT NULL,
    categoria_id integer NOT NULL,
    CONSTRAINT fk_demanda FOREIGN KEY (demanda_id) REFERENCES public.demandas (id) ON DELETE CASCADE,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES public.categorias (id) ON DELETE CASCADE,
    PRIMARY KEY (demanda_id, categoria_id)
);

-- Tabela 5: Acoes_Publicas (Respostas dos Parlamentares)
CREATE TABLE IF NOT EXISTS public.acoes_publicas
(
    id bigserial NOT NULL,
    titulo text NOT NULL,
    descricao text,
    status text NOT NULL DEFAULT 'PLANEJADA' CHECK (status IN ('PLANEJADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'CANCELADA')),
    prioridade text NOT NULL DEFAULT 'Normal' CHECK (prioridade IN ('Baixa', 'Normal', 'Alta', 'Urgente')),
    data_inicio date,
    data_prevista_conclusao date,
    data_conclusao_real date,
    demanda_origem_id bigint NOT NULL,
    responsavel_id bigint NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_demanda_origem FOREIGN KEY (demanda_origem_id) REFERENCES public.demandas (id) ON DELETE SET NULL,
    CONSTRAINT fk_responsavel FOREIGN KEY (responsavel_id) REFERENCES public.usuarios (id)
);

-- Tabela 6: Atualizacoes (Comentários e Histórico)
CREATE TABLE IF NOT EXISTS public.atualizacoes
(
    id bigserial NOT NULL,
    texto text NOT NULL,
    data_criacao timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    autor_id bigint NOT NULL,
    demanda_id bigint,
    acao_publica_id bigint,
    PRIMARY KEY (id),
    CONSTRAINT fk_autor FOREIGN KEY (autor_id) REFERENCES public.usuarios (id),
    CONSTRAINT fk_demanda FOREIGN KEY (demanda_id) REFERENCES public.demandas (id) ON DELETE CASCADE,
    CONSTRAINT fk_acao_publica FOREIGN KEY (acao_publica_id) REFERENCES public.acoes_publicas (id) ON DELETE CASCADE
);