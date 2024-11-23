'use client'

import { styled } from '@mui/system';
import { Box, Button, Link, type LinkProps } from '@mui/material';
import { MAIN_COLOR } from '../../theme/constants';

export const SideNavOuterBox = styled(Box)(({theme}) => ({
  display: 'flex',
  height: '85%',

  [theme.breakpoints.down('md')]: {
    position: 'static', // Change from fixed to static on mobile
    padding: '16px 12px',
    minWidth: 'fit-content', // Ensure it takes the width of its content
  },

  [theme.breakpoints.up('md')]: {
    position: 'fixed',
    padding: '8px',
  },
}));

export const SideNavInnerBox = styled(Box)(({theme}) => ({
  display: 'flex',
  flexGrow: 1,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    marginLeft: '8px',
    gap: '8px', // Add some spacing between buttons
    justifyContent: 'flex-start', // Align items to start instead of space-between
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'column',
    marginLeft: '0px',
    marginTop: '8px',
    justifyContent: 'space-between',
  },
}));

export const SideNavSpacer = styled(Box)(({theme}) => ({
	display: 'none',
	height: 'auto',
	width: '100%',
	flexGrow: 1,
	borderRadius: '6px',
	[theme.breakpoints.up('md')]: {
		display: 'block',
	},
}));

export const NavLink = styled(Link)<LinkProps>(({theme}) => ({
  display: 'flex',
  height: '48px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '6px',
  padding: '12px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  textDecoration: 'none',
  color: MAIN_COLOR,

  [theme.breakpoints.down('md')]: {
    minWidth: '48px', // Set minimum width on mobile
    flexGrow: 0, // Don't grow on mobile
  },

  [theme.breakpoints.up('md')]: {
    width: '100%',
    WebkitJustifyContent: 'flex-start',
    padding: '8px 12px',
  },
}));

export const SideNavButton = styled(Button)(({theme}) => ({
  display: 'flex',
  height: '48px',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: '6px',
  padding: '12px',
  fontSize: '14px',
  lineHeight: '20px',
  fontWeight: 500,
  color: MAIN_COLOR,

  [theme.breakpoints.down('md')]: {
    minWidth: '48px', // Set minimum width on mobile
    flexGrow: 0, // Don't grow on mobile
  },

  [theme.breakpoints.up('md')]: {
    width: '100%',
    WebkitJustifyContent: 'flex-start',
    padding: '8px 12px',
  },
}));

export const SignOutBox = styled(Box)(({theme}) => ({
	display: 'none',
	[theme.breakpoints.up('md')]: {
		display: 'block',
	},
}));