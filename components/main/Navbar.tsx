'use client'

import { AppBar, Box, Container, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { usePathname } from 'next/navigation';
import { useMenu } from './hooks/useMenu';
import { useNavPages } from './hooks/useNavPages';
import { NavMenu } from './components/NavMenu';
import { DesktopNav } from './components/DesktopNav';
import { SocialLinks } from './components/SocialLinks';
import NavbarLogo from './NavbarLogo';
import NavbarSkeleton from './components/NavbarSkeleton';

export const Navbar = () => {
  const pathname = usePathname();
  const { navPages, isLoading } = useNavPages();
  const navMenu = useMenu();
  const socialMenu = useMenu();

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Mobile Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              onClick={navMenu.handleOpen}
              color='inherit'
              aria-label="navigation menu"
            >
              <MenuIcon />
            </IconButton>
            <NavMenu
              {...navMenu}
              onClose={navMenu.handleClose}
              pages={navPages}
              pathname={pathname}
            />
          </Box>

          <NavbarLogo />

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          />

          {/* Desktop Navigation */}
          <DesktopNav pages={navPages} pathname={pathname} />

          {/* Social Links */}
          <SocialLinks socialMenu={socialMenu} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};