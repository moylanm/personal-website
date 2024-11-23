'use client'

import { styled } from '@mui/system';
import {
  Box,
  Button,
  AccordionSummary,
  DialogTitle,
  type ButtonProps
} from '@mui/material';
import { MAIN_COLOR } from '@/styles/theme/constants';

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
	[theme.breakpoints.down('md')]: {
		marginTop: '60px'
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