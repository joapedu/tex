CREATE OR REPLACE FUNCTION selecionar_todas_pessoas()
RETURNS TABLE (
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
    RETURN QUERY SELECT * FROM Pessoas;
END;
$$ LANGUAGE plpgsql;
