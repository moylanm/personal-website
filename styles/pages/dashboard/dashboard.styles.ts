'use client'

import { styled } from '@mui/system';
import {
  Box,
  Button,
  AccordionSummary,
  DialogTitle,
  Paper,
  Tab,
  type ButtonProps,
} from '@mui/material';
import { MAIN_COLOR } from '@/styles/theme/constants';

export const DashboardLayoutBox = styled(Box)(({theme}) => ({
  display: 'flex',
  width: '100%',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
}));

export const DashboardLayoutSideNavBox = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
  },

  [theme.breakpoints.up('md')]: {
    width: '64px',
    flexShrink: 0,
  },
}));

export const DashboardLayoutChildrenBox = styled(Box)({
	flexGrow: 1,
	padding: '24px',
	overflow: 'auto',
});

export const PublishFormTab = styled(Tab)({
  textTransform: 'capitalize',
  '&:hover': {
    color: MAIN_COLOR,
    opacity: 0.7
  }
});

export const MarkdownPreviewPaper = styled(Paper)({
  paddingLeft: 12,
  paddingRight: 12,
  marginTop: 15,
  marginBottom: 8,
  height: '310px',
  overflow: 'auto'
});

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