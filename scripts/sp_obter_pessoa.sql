CREATE OR REPLACE FUNCTION obter_pessoa(
    p_idPessoa INT
) RETURNS TABLE (
    IdPessoa INT,
    Nome VARCHAR,
    DataNascimento DATE,
    Salario NUMERIC,
    Observacoes TEXT,
    NomeMae VARCHAR,
    NomePai VARCHAR,
    CPF VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT p.IdPessoa, p.Nome, p.DataNascimento, p.Salario, p.Observacoes, p.NomeMae, p.NomePai, p.CPF
    FROM Pessoas p
    WHERE p.IdPessoa = p_idPessoa;
END;
$$ LANGUAGE plpgsql;
