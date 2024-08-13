import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getPessoas = () => api.get('/pessoas/');

export const createPessoa = (data: any) => api.post('/pessoas/criar/', {
  nome: data.nome,
  dataNascimento: data.dataNascimento,
  salario: Number(data.salario),
  observacoes: data.observacoes || '',
  nomeMae: data.nomeMae,
  nomePai: data.nomePai,
  cpf: data.cpf
});

export const updatePessoa = (id: number, data: any) => api.put(`/pessoas/atualizar/`, {
  idPessoa: id,
  nome: data.nome,
  dataNascimento: data.dataNascimento,
  salario: Number(data.salario),
  observacoes: data.observacoes || '',
  nomeMae: data.nomeMae,
  nomePai: data.nomePai,
  cpf: data.cpf
});

export const deletePessoa = (id: number) => api.delete(`/pessoas/remover/`, {data: { idPessoa: id }});
