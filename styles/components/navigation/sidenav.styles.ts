'use client'

import { styled } from '@mui/system';
import { Box, Button, Link, type LinkProps } from '@mui/material';
import { MAIN_COLOR } from '../../theme/constants';

export const SideNavOuterBox = styled(Box)(({theme}) => ({
	position: 'fixed',
	display: 'flex',
	height: '85%',
	flex: 'column',
	padding: '16px 12px',
	[theme.breakpoints.up('md')]: {
		padding: '8px'
	},
}));

export const SideNavInnerBox = styled(Box)(({theme}) => ({
	display: 'flex',
	flexGrow: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
	marginLeft: '8px',
	[theme.breakpoints.up('md')]: {
		flexDirection: 'column',
		marginLeft: '0px',
		marginTop: '8px',
	}
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
	width: '100%',
	flexGrow: 1,
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
	[theme.breakpoints.up('md')]: {
		flex: 'none',
		WebkitJustifyContent: 'flex-start',
		padding: '8px',
		paddingLeft: '12px',
		paddingRight: '12px',
	},
}));

export const SideNavButton = styled(Button)(({theme}) => ({
	display: 'flex',
	height: '48px',
	width: '100%',
	flexGrow: 1,
	alignItems: 'center',
	justifyContent: 'center',
	gap: '8px',
	borderRadius: '6px',
	padding: '12px',
	fontSize: '14px',
	lineHeight: '20px',
	fontWeight: 500,
	color: MAIN_COLOR,
	[theme.breakpoints.up('md')]: {
		flex: 'none',
		WebkitJustifyContent: 'flex-start',
		padding: '8px',
		paddingLeft: '12px',
		paddingRight: '12px',
	},
}));

export const SignOutBox = styled(Box)(({theme}) => ({
	display: 'none',
	[theme.breakpoints.up('md')]: {
		display: 'block',
	},
}));