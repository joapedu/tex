import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { updatePessoa } from '../services/api';

const FormModal = ({ isOpen, pessoa, onClose, onSave, setIsLoading }: any) => {
  const initialValues = pessoa || {
    nome: '',
    dataNascimento: '',
    salario: 0,
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
    setIsLoading(true);
    const formattedValues = {
      ...values,
      salario: parseFloat(values.salario),
    };

    updatePessoa(pessoa.idPessoa, formattedValues)
      .then(response => {
        onSave();
        onClose();
      })
      .catch(error => {
        console.error('Erro ao atualizar pessoa', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Atualizar Pessoa</DialogTitle>
      <DialogContent>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <Field name="nome" as={TextField} label="Nome" fullWidth error={touched.nome && !!errors.nome} helperText={touched.nome && errors.nome} sx={{ mb: 2, mt: 1 }} />
              <Field name="dataNascimento" as={TextField} label="Data de Nascimento" type="date" fullWidth InputLabelProps={{ shrink: true }} error={touched.dataNascimento && !!errors.dataNascimento} helperText={touched.dataNascimento && errors.dataNascimento} sx={{ mb: 2 }} />
              <Field name="salario" as={TextField} label="Salário" fullWidth error={touched.salario && !!errors.salario} helperText={touched.salario && errors.salario} sx={{ mb: 2 }} />
              <Field name="nomeMae" as={TextField} label="Nome da Mãe" fullWidth error={touched.nomeMae && !!errors.nomeMae} helperText={touched.nomeMae && errors.nomeMae} sx={{ mb: 2 }} />
              <Field name="nomePai" as={TextField} label="Nome do Pai" fullWidth error={touched.nomePai && !!errors.nomePai} helperText={touched.nomePai && errors.nomePai} sx={{ mb: 2 }} />
              <Field name="cpf" as={TextField} label="CPF" fullWidth error={touched.cpf && !!errors.cpf} helperText={touched.cpf && errors.cpf} sx={{ mb: 2 }} />
              <Field name="observacoes" as={TextField} label="Observações" fullWidth error={touched.observacoes && !!errors.observacoes} helperText={touched.observacoes && errors.observacoes} sx={{ mb: 2 }} />
              <DialogActions>
                <Button onClick={onClose} color="secondary">Cancelar</Button>
                <Button type="submit" variant="contained" color="primary">Salvar</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
