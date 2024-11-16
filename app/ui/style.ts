'use client'

import { styled } from '@mui/system';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import {
	Container,
	Box,
	Button,
	Card,
	Grid2,
	Paper,
	TableContainer,
	Link,
	DialogTitle,
	AccordionSummary,
	Radio,
	Checkbox,
	type TableContainerProps,
	type Grid2Props,
	type LinkProps,
	type ButtonProps,
	type CheckboxProps
} from '@mui/material';

export const MAIN_COLOR = '#62CB21';
export const FILTER_FORM_COLOR = '#666666';

export const NavbarButton = styled(Button)<ButtonProps>({
	textAlign: 'center',
	textTransform: 'capitalize',
	color: MAIN_COLOR,
	display: 'block'
});

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
	color: MAIN_COLOR
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
	maxWidth: '750px',
	padding: '30px'
});

export const FilterFormPaper = styled(Paper)(({theme}) => ({
	position: 'fixed',
	top: theme.spacing(11),
	height: `calc(100vh - ${theme.spacing(4)} - 140px)`,
	padding: theme.spacing(2),
	display: 'flex',
	flexDirection: 'column',
	width: '300px',
	overflow: 'hidden'
}));

export const FilterFormButton = styled(Button)<ButtonProps>({
	color: 'white',
	borderColor: FILTER_FORM_COLOR,
	'&:hover': {
		borderColor: FILTER_FORM_COLOR,
	}
});

export const FilterFormRadio = styled(Radio)({
	color: FILTER_FORM_COLOR,
	'&.Mui-checked': {
		color: FILTER_FORM_COLOR,
	}
});

export const FilterFormCheckbox = styled(Checkbox)<CheckboxProps>({
  '&.Mui-checked': {
    color: FILTER_FORM_COLOR,
  }
});

export const ScrollableSection = styled(Box)({
	overflowY: 'auto',
	overflowX: 'hidden',
	flex: 1,
	width: '100%'
});

export const WorksList = styled(Box)(({theme}) => ({
	marginLeft: theme.spacing(3),
	display: 'flex',
	flexDirection: 'column',
	'& .MuiFormControlLabel-root': {
		margin: 0,
		width: '100%',
		'& .MuiFormControlLabel-label': {
			width: '100%',
			wordBreak: 'break-word',
			whitespace: 'normal',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}
	}
}));

export const SkeletonContainer = styled(Container)(({theme}) => ({
	minWidth: '400px',
	[theme.breakpoints.up('md')]: {
		minWidth: '800px'
	}
}));

export const ExcerptCard = styled(Card)({
	p: 2,
	mx: 3,
	marginTop: '180px',
	marginBottom: '110px',
	display: 'flex',
	justifyContent: 'center'
});

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

export const DashboardFormButton = styled(Button)<ButtonProps>({
	backgroundColor: MAIN_COLOR,
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

export const ScrollToTopButton = styled(Button)(({theme}) => ({
	position: 'fixed',
	minWidth: '24px',
	bottom: 100,
	right: 15,
	[theme.breakpoints.up('md')]: {
		right: 50
	}
}));