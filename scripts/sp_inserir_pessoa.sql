CREATE OR REPLACE FUNCTION inserir_pessoa(
    p_nome VARCHAR,
    p_dataNascimento DATE,
    p_salario NUMERIC,
    p_observacoes TEXT,
    p_nomeMae VARCHAR,
    p_nomePai VARCHAR,
    p_cpf VARCHAR
) RETURNS INT AS $$
DECLARE
    v_idPessoa INT;
BEGIN
    INSERT INTO Pessoas (Nome, DataNascimento, Salario, Observacoes, NomeMae, NomePai, CPF)
    VALUES (p_nome, p_dataNascimento, p_salario, p_observacoes, p_nomeMae, p_nomePai, p_cpf)
    RETURNING IdPessoa INTO v_idPessoa;

    RETURN v_idPessoa;
END;
$$ LANGUAGE plpgsql;
