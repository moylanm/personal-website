import { AppBar, Box, Container, Skeleton, Toolbar } from '@mui/material';

const NavbarSkeleton = () => {
  return (
    <AppBar position='fixed'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          {/* Mobile Menu Icon Skeleton */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Skeleton 
              variant="circular" 
              width={40} 
              height={40} 
              sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
            />
          </Box>

          {/* Logo Skeleton */}
          <Skeleton 
            variant="circular" 
            width={40} 
            height={40} 
            sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex'
            }} 
          />

          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          />

          {/* Desktop Nav Items Skeleton */}
          <Box sx={{ marginLeft: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {[1, 2, 3].map((item) => (
              <Skeleton 
                key={item}
                variant="rectangular" 
                width={70} 
                height={36} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
              />
            ))}
          </Box>

          {/* Social Links Skeleton */}
          <Box sx={{ flexGrow: 0 }}>
            {/* Desktop Social Icons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {[1, 2, 3].map((item) => (
                <Skeleton 
                  key={item}
                  variant="circular" 
                  width={24} 
                  height={24} 
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
                />
              ))}
            </Box>

            {/* Mobile Social Menu Icon */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <Skeleton 
                variant="circular" 
                width={40} 
                height={40} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} 
              />
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavbarSkeleton;
