import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      sx={{
        width: isOpen ? 240 : 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: isOpen ? 240 : 0,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          backgroundColor: '#CFD8DC',
        },
      }}
    >
      <Box sx={{ mt: 8 }}>
        <List>
          <ListItem button component={Link} to="/cadastro">
            <ListItemText primary="Cadastro" />
          </ListItem>
          <ListItem button component={Link} to="/listagem">
            <ListItemText primary="Listagem" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
