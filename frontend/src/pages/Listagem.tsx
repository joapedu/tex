import { useEffect, useState } from 'react';
import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getPessoas, deletePessoa } from '../services/api';
import FormModal from '../components/FormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import Loading from '../components/Loading';

const Listagem = () => {
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [selectedPessoa, setSelectedPessoa] = useState<any>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPessoas();
  }, []);

  const fetchPessoas = () => {
    setIsLoading(true);
    getPessoas()
      .then(response => {
        if (response.data && Array.isArray(response.data.data)) {
          setPessoas(response.data.data);
        } else {
          console.error("Erro: Estrutura inesperada na resposta da API", response.data);
          setPessoas([]);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar pessoas", error);
        setPessoas([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEdit = (pessoa: any) => {
    const pessoaData = {
      idPessoa: pessoa[0],
      nome: pessoa[1],
      dataNascimento: pessoa[2],
      salario: pessoa[3],
      observacoes: pessoa[4],
      nomeMae: pessoa[5],
      nomePai: pessoa[6],
      cpf: pessoa[7],
    };
    setSelectedPessoa(pessoaData);
    setEditModalOpen(true);
  };

  const handleDelete = (pessoa: any) => {
    const pessoaData = {
      idPessoa: pessoa[0],
      nome: pessoa[1],
    };
    setSelectedPessoa(pessoaData);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setIsLoading(true);
    deletePessoa(selectedPessoa.idPessoa)
      .then(() => {
        setDeleteDialogOpen(false);
        fetchPessoas();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <List>
          {pessoas.map((pessoa: any) => (
            <ListItem key={pessoa[0]}>
              <ListItemText primary={pessoa[1]} secondary={`CPF: ${pessoa[7]}`} />
              <IconButton onClick={() => handleEdit(pessoa)}><EditIcon /></IconButton>
              <IconButton onClick={() => handleDelete(pessoa)}><DeleteIcon /></IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <FormModal
        isOpen={isEditModalOpen}
        pessoa={selectedPessoa}
        onClose={() => setEditModalOpen(false)}
        onSave={fetchPessoas}
        setIsLoading={setIsLoading}
      />

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Confirmar Exclusão"
        message={`Deseja excluir ${selectedPessoa?.nome}?`}
        onConfirm={confirmDelete}
        onClose={() => setDeleteDialogOpen(false)}
      />
    </Box>
  );
};

export default Listagem;