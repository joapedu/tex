import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';
import MediumIcon from '@mui/icons-material/Article';

const Header = ({ toggleSidebar }: any) => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" sx={{ fontFamily: 'Pacifico, cursive', marginLeft: '2%' }}>
                    T E X
                </Typography>
                <Box sx={{ ml: 'auto' }}>
                    <IconButton color="inherit" component="a" href="https://github.com/joapedu" target="_blank">
                        <GitHubIcon />
                    </IconButton>
                    <IconButton color="inherit" component="a" href="https://www.linkedin.com/in/joão-eduardo-braga/" target="_blank">
                        <LinkedInIcon />
                    </IconButton>
                    <IconButton color="inherit" component="a" href="https://portfolio-joapedu.vercel.app/" target="_blank">
                        <WebIcon />
                    </IconButton>
                    <IconButton color="inherit" component="a" href="https://codepen.io/joapedu" target="_blank">
                        <CodeIcon />
                    </IconButton>
                    <IconButton color="inherit" component="a" href="https://medium.com/@joaoeduardobraga2" target="_blank">
                        <MediumIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;