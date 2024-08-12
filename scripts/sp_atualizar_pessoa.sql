CREATE OR REPLACE FUNCTION atualizar_pessoa(
    p_idPessoa INT,
    p_nome VARCHAR,
    p_dataNascimento DATE,
    p_salario NUMERIC,
    p_observacoes TEXT,
    p_nomeMae VARCHAR,
    p_nomePai VARCHAR,
    p_cpf VARCHAR
) RETURNS TEXT AS $$
BEGIN
    UPDATE Pessoas
    SET Nome = p_nome,
        DataNascimento = p_dataNascimento,
        Salario = p_salario,
        Observacoes = p_observacoes,
        NomeMae = p_nomeMae,
        NomePai = p_nomePai,
        CPF = p_cpf
    WHERE IdPessoa = p_idPessoa;

    RETURN 'OK';
END;
$$ LANGUAGE plpgsql;
