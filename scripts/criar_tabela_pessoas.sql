CREATE TABLE Pessoas (
    IdPessoa SERIAL PRIMARY KEY,
    Nome VARCHAR(100),
    DataNascimento DATE,
    Salario NUMERIC(10, 2),
    Observacoes TEXT
);
