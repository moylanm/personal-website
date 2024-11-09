'use client'

import { styled } from '@mui/system';
import type { TableContainerProps, Grid2Props } from '@mui/material';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import {
	Container,
	Box,
	Button,
	Card,
	FormControl,
	Grid2,
	Paper,
	TableContainer,
	Link,
	DialogTitle,
	AccordionSummary,
	type LinkProps,
	type ButtonProps,
} from '@mui/material';

export const HomeTableContainer = styled(TableContainer)<TableContainerProps>(({theme }) => ({
	marginTop: '180px',
	marginBottom: '180px',
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '400px',
	[theme.breakpoints.up('md')]: {
		maxWidth: '800px',
	}
}));

export const ExcerptLink = styled(NextLink)<NextLinkProps>({
	'&:hover': {
		textDecoration: 'underline'
	},
	textDecoration: 'none',
	color: '#62CB31'
});

export const AboutContainer = styled(Container)({
	marginTop: '150px',
	marginBottom: '150px',
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '800px'
});

export const AboutGrid2 = styled(Grid2)<Grid2Props>({
	alignItems: 'center',
	justifyContent: 'center',
});

export const AboutCard = styled(Card)({
	padding: '30px'
})

export const FilterFormContainer = styled(Container)(({theme}) => ({
	position: 'relative',
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.up('sm')]: {
		flexDirection: 'row'
	},
}));

export const FilterFormControl = styled(FormControl)(({theme}) => ({
	marginRight: '0px',
	[theme.breakpoints.up('sm')]: {
		marginRight: '25px'
	},
}));

export const LoginFormContainer = styled(Container)({
	marginTop: '180px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const LoginFormCard = styled(Paper)({
	minWidth: '400px',
	padding: '25px'
});

export const DashboardLayoutBox = styled(Box)(({theme}) => ({
	display: 'flex',
	height: '80vh',
	flexDirection: 'column',
	[theme.breakpoints.up('md')]: {
		flexDirection: 'row',
		overflow: 'hidden',
	},
}));

export const DashboardLayoutSideNavBox = styled(Box)(({theme}) => ({
	width: '100%',
	flex: 'none',
	[theme.breakpoints.up('md')]: {
		width: '64px',
	},
}));

export const DashboardLayoutChildrenBox = styled(Box)(({theme}) => ({
	flexGrow: 1,
	padding: '24px',
	[theme.breakpoints.up('md')]: {
		overflowY: 'auto',
		padding: '48px',
	},
}));

export const SideNavOuterBox = styled(Box)(({theme}) => ({
	position: 'fixed',
	display: 'flex',
	height: '80%',
	flex: 'column',
	padding: '16px 12px',
	[theme.breakpoints.up('md')]: {
		padding: '16px 8px'
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
	color: '#62CB31',
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
	color: '#62CB31',
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

export const DashboardFormButton = styled(Button)<ButtonProps>({
	backgroundColor: '#62CB31',
	color: '#0D1A07'
});

export const EditorAccordionSummary = styled(AccordionSummary)({
	'&:hover': {
		backgroundColor: '#303539'
	}
});

export const CloseDialogTitle = styled(DialogTitle)({
	fontSize: '1rem'
});

export const ScrollToTopButton = styled(Button)({
	position: 'fixed',
	bottom: 100,
	right: 50,
});