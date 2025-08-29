CREATE DATABASE DEV;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS enderecos(
   	id_endereco UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	rua VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    CEP VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS alunos (
    id_aluno UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    foto VARCHAR(255),
    CPF VARCHAR(255) UNIQUE NOT NULL,
    status INT DEFAULT 1,
    role VARCHAR(255) DEFAULT 'aluno',
    modalidade INT NOT NULL,
	id_endereco UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	CONSTRAINT fk_enderecos FOREIGN KEY (id_endereco) REFERENCES enderecos(id_endereco)
);

CREATE OR REPLACE FUNCTION set_update_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_updated_at
BEFORE UPDATE ON alunos
FOR EACH ROW
EXECUTE FUNCTION set_update_at();