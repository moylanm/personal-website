import { Box } from '@mui/material';
import Link from 'next/link';
import { NavPage } from '@/lib/constants/navigation';
import { NavbarButton } from '@/app/ui/style';

interface DesktopNavProps {
  pages: NavPage[];
  pathname: string;
}

export const DesktopNav = ({ pages, pathname }: DesktopNavProps) => (
  <Box sx={{ marginLeft: 2, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    {pages.map((page) => (
      <NavbarButton
        sx={{ mx: 1 }}
        key={page.value}
        component={Link}
        href={page.url}
        style={ pathname === page.url ? { backgroundColor: '#303539' } : {} }
      >
        {page.value}
      </NavbarButton>
    ))}
  </Box>
);