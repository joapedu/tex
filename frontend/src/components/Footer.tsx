import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 2, bgcolor: 'primary.main', color: 'black', textAlign: 'center', mt: 'auto', position: 'fixed', bottom: 0, width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Typography variant='h6' sx={{ fontFamily: 'Pacifico, cursive' }}>Ⓒ João Eduardo Braga</Typography>
    </Box>
  );
};

export default Footer;
