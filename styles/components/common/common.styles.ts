'use client'

import { styled } from '@mui/system';
import { Button, Box, Container, type ButtonProps } from '@mui/material';
import { MAIN_COLOR } from '@/styles/theme/constants';

export const ScrollToTopButton = styled(Button)(({theme}) => ({
	position: 'fixed',
	minWidth: '24px',
	bottom: 100,
	right: 15,
	[theme.breakpoints.up('md')]: {
		right: 50
	}
}));

export const NotFoundBox = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	minHeight: '50vh',
	textAlign: 'center'
});

export const NotFoundButton = styled(Button)<ButtonProps>({
	color: MAIN_COLOR,
	borderColor: MAIN_COLOR
});

export const SkeletonContainer = styled(Container)(({theme}) => ({
	minWidth: '400px',
	[theme.breakpoints.up('md')]: {
		minWidth: '800px'
	}
}));