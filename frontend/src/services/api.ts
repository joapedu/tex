import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getPessoas = () => api.get('/pessoas/');
export const createPessoa = (data: any) => api.post('/pessoas/criar/', data);
export const updatePessoa = (id: number, data: any) => api.put(`/pessoas/${id}/`, data);
export const deletePessoa = (id: number) => api.delete(`/pessoas/${id}/`);
