import { AppBar, Box, Container, Skeleton, Toolbar } from '@mui/material';

const NavbarSkeleton = () => {
  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Mobile Menu Icon Skeleton */}
          <Box 
            data-testid='mobile-menu-container'
            sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}
          >
            <Skeleton 
              variant='rectangular' 
              width={40} 
              height={40} 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
              data-testid='mobile-menu-skeleton'
            />
          </Box>

          {/* Logo Skeleton */}
          <Skeleton 
            variant='circular' 
            width={40} 
            height={40} 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex'
            }}
            data-testid='logo-skeleton'
          />

          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
            }}
          />

          {/* Desktop Nav Items Skeleton */}
          <Box 
            data-testid='desktop-nav-container'
            sx={{ marginLeft: 2, flexGrow: 1, display: { xs: 'none', sm: 'flex' }, gap: 2 }}
          >
            {[1, 2, 3].map((item) => (
              <Skeleton 
                key={item}
                variant='rectangular' 
                width={70} 
                height={36} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                data-testid={`nav-item-skeleton-${item}`}
              />
            ))}
          </Box>

          {/* Social Links Skeleton */}
          <Box sx={{ flexGrow: 0 }}>
            {/* Desktop Social Icons */}
            <Box 
              data-testid='desktop-social-container'
              sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}
            >
              {[1, 2, 3].map((item) => (
                <Skeleton 
                  key={item}
                  variant='circular' 
                  width={24} 
                  height={24} 
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                  data-testid={`social-icon-skeleton-${item}`}
                />
              ))}
            </Box>

            {/* Mobile Social Menu Icon */}
            <Box 
              data-testid='mobile-social-container'
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <Skeleton 
                variant='rectangular' 
                width={40} 
                height={40} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }}
                data-testid='mobile-social-skeleton'
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarSkeleton;
