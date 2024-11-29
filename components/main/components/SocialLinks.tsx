import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import Image from 'next/image';
import { SOCIAL_LINKS } from '@/lib/constants/social-links';

interface SocialLinksProps {
  socialMenu: {
    anchorEl: HTMLElement | null;
    isOpen: boolean;
    handleOpen: (event: React.MouseEvent<HTMLElement>) => void;
    handleClose: () => void;
  };
}

export const SocialLinks = ({ socialMenu }: SocialLinksProps) => (
  <Box sx={{ flexGrow: 0 }}>
    {/* Desktop view */}
    <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
      {SOCIAL_LINKS.map((link) => (
        <Link key={link.title} href={link.url}>
          <Image
            style={{ marginLeft: '10px' }}
            width={24}
            height={24}
            src={link.icon}
            alt={link.alt}
            title={link.title}
          />
        </Link>
      ))}
    </Box>

    {/* Mobile view */}
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <IconButton
        onClick={socialMenu.handleOpen}
        sx={{ color: 'white' }}
        aria-label="social links menu"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={socialMenu.anchorEl}
        open={socialMenu.isOpen}
        onClose={socialMenu.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {SOCIAL_LINKS.map((link) => (
          <MenuItem 
            key={link.title}
            component={Link} 
            href={link.url} 
            onClick={socialMenu.handleClose}
          >
            <Image
              style={{ marginRight: '5px' }}
              width={24} 
              height={24} 
              src={link.icon} 
              alt={link.alt} 
            />
            <Typography>{link.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  </Box>
);