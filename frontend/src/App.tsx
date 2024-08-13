import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { Header, Footer, Sidebar } from './components';
import { Cadastro, Listagem } from './pages';
import theme from './styles/theme';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#ECEFF1' }}>
        <Router>
          <Header toggleSidebar={toggleSidebar} />
          <Box sx={{ display: 'flex', flexGrow: 1, mt: 8 }}>
            <Sidebar isOpen={sidebarOpen} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: sidebarOpen ? 0 : 0, transition: 'margin-left 0.3s ease' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/listagem" />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/listagem" element={<Listagem />} />
              </Routes>
            </Box>
          </Box>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
