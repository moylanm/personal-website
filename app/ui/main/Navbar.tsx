'use client'

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import NavbarLogo from './NavbarLogo';
import Image from 'next/image';
import { NavbarButton } from '../style';

const PAGES = [
  { url: '/', value: 'home'},
  { url: '/excerpts', value: 'excerpts'},
  { url: '/about', value: 'about'}
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [navPages, setNavPages] = useState(PAGES);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const sessionKey = status + (session?.user?.email || '');

  useEffect(() => {
    const updatedPages = status === 'authenticated' && session
      ? [...PAGES, { url: '/dashboard', value: 'dashboard' }]
      : PAGES;

    setNavPages(updatedPages);
  }, [status, session]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar key={sessionKey} position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
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
              {navPages.map((page) => (
                 <MenuItem
                  key={page.value}
									component={Link}
									href={page.url}
                  onClick={handleCloseNavMenu}
                  style={ pathname === page.url ? { backgroundColor: '#303539' } : {} }
                >
                  <Typography sx={{ textTransform: 'capitalize', color: '#62CB21', textAlign: 'center' }}>
                    {page.value}
                  </Typography>
                 </MenuItem>
              ))}
            </Menu>
          </Box>
          <NavbarLogo />
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          />
          <Box sx={{ marginLeft: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navPages.map((page) => (
               <NavbarButton
                key={page.value}
								component={Link}
								href={page.url}
                style={ pathname === page.url ? { backgroundColor: '#303539' } : {} }
               >
                  {page.value}
              </NavbarButton>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Link href='https://github.com/moylanm'>
              <Image
                style={{ marginRight: '10px' }}
                width={24}
                height={24}
                src='/github.png'
                alt='Github page'
                title='Github'
              />
            </Link>
            <Link href='https://www.linkedin.com/in/myles-moylan/'>
              <Image
                  width={24}
                  height={24}
                  src='/linkedin.png'
                  alt='LinkedIn page'
                  title='LinkedIn'
              />
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
