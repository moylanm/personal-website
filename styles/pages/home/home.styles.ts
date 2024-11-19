'use client'

import { styled } from '@mui/system';
import { TableContainer, type TableContainerProps } from '@mui/material';

export const HomeTableContainer = styled(TableContainer)<TableContainerProps>(({theme}) => ({
	marginTop: '180px',
	marginBottom: '180px',
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '400px',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '800px',
	}
}));