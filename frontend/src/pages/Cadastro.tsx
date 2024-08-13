// src/pages/Cadastro.tsx
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createPessoa } from '../services/api';

const Cadastro = () => {
  const initialValues = {
    nome: '',
    dataNascimento: '',
    salario: '',
    nomeMae: '',
    nomePai: '',
    cpf: '',
    observacoes: '',
  };

  const validationSchema = Yup.object({
    nome: Yup.string().required('Nome é obrigatório'),
    dataNascimento: Yup.date().required('Data de Nascimento é obrigatória'),
    salario: Yup.number().required('Salário é obrigatório').positive('Salário deve ser positivo'),
    nomeMae: Yup.string().required('Nome da Mãe é obrigatório'),
    nomePai: Yup.string().required('Nome do Pai é obrigatório'),
    cpf: Yup.string().length(11, 'CPF deve ter 11 dígitos').required('CPF é obrigatório'),
    observacoes: Yup.string().required('Observações são obrigatórias'),
  });

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      salario: Number(values.salario),
    };

    createPessoa(formattedValues).then(response => {
      alert('Pessoa cadastrada com sucesso!');
    }).catch(error => {
      console.error('Erro ao cadastrar pessoa', error);
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Cadastro de Pessoa</Typography>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            <Field name="nome" as={TextField} label="Nome" fullWidth error={touched.nome && !!errors.nome} helperText={touched.nome && errors.nome} sx={{ mb: 2 }} />
            <Field name="dataNascimento" as={TextField} label="Data de Nascimento" type="date" fullWidth InputLabelProps={{ shrink: true }} error={touched.dataNascimento && !!errors.dataNascimento} helperText={touched.dataNascimento && errors.dataNascimento} sx={{ mb: 2 }} />
            <Field name="salario" as={TextField} label="Salário" type="number" fullWidth error={touched.salario && !!errors.salario} helperText={touched.salario && errors.salario} sx={{ mb: 2 }} />
            <Field name="nomeMae" as={TextField} label="Nome da Mãe" fullWidth error={touched.nomeMae && !!errors.nomeMae} helperText={touched.nomeMae && errors.nomeMae} sx={{ mb: 2 }} />
            <Field name="nomePai" as={TextField} label="Nome do Pai" fullWidth error={touched.nomePai && !!errors.nomePai} helperText={touched.nomePai && errors.nomePai} sx={{ mb: 2 }} />
            <Field name="cpf" as={TextField} label="CPF" fullWidth error={touched.cpf && !!errors.cpf} helperText={touched.cpf && errors.cpf} sx={{ mb: 2 }} />
            <Field name="observacoes" as={TextField} label="Observações" fullWidth error={touched.observacoes && !!errors.observacoes} helperText={touched.observacoes && errors.observacoes} sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb: 5, ml: 'auto'}}>Cadastrar</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Cadastro;
