'use client'

import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import NavbarLogo from './NavbarLogo';
import Image from 'next/image';

const PAGES = [
  { url: '/', value: 'home'},
  { url: '/excerpts', value: 'excerpts'},
  { url: '/about', value: 'about'}
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {PAGES.map((page) => (
                 <MenuItem
                  key={page.value}
									component={Link}
									href={page.url}
                  onClick={handleCloseNavMenu}
                >
                  <Typography sx={{ color: '#62CB21', textAlign: 'center' }}>
                    {page.value.toUpperCase()}
                  </Typography>
                 </MenuItem>
              ))}
            </Menu>
          </Box>
          <NavbarLogo />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          />
          <Box sx={{ marginLeft: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map((page) => (
               <Button
                key={page.value}
								component={Link}
								href={page.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: '#62CB21', display: 'block' }}
               >
                  {page.value}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link href='mailto:contact@mylesmoylan.net'>
              <Image
                style={{ marginRight: '10px' }}
                width={32}
                height={32}
                src='/mail.png'
                alt='Contact email'
              />
            </Link>
            <Link href='https://www.linkedin.com/in/myles-moylan/'>
              <Image
                  width={32}
                  height={32}
                  src='/linkedin.png'
                  alt='LinkedIn page'
              />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
