import { MenuItem, Menu, Typography } from '@mui/material';
import Link from 'next/link';
import { NavPage } from '@/lib/constants/navigation';
import { MAIN_COLOR } from '@/styles';

interface NavMenuProps {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
  pages: NavPage[];
  pathname: string;
}

export const NavMenu = ({ anchorEl, isOpen, onClose, pages, pathname }: NavMenuProps) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    keepMounted
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    open={isOpen}
    onClose={onClose}
    sx={{ display: { xs: 'block', sm: 'none' } }}
  >
    {pages.map((page) => (
      <MenuItem
        key={page.value}
        component={Link}
        href={page.url}
        onClick={onClose}
        style={ pathname === page.url ? { backgroundColor: '#303539' } : {} }
      >
        <Typography sx={{ textTransform: 'capitalize', color: MAIN_COLOR, textAlign: 'center' }}>
          {page.value}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
);