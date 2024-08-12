CREATE OR REPLACE FUNCTION remover_pessoa(
    p_idPessoa INT
) RETURNS TEXT AS $$
BEGIN
    DELETE FROM Pessoas
    WHERE IdPessoa = p_idPessoa;

    RETURN 'OK';
END;
$$ LANGUAGE plpgsql;
