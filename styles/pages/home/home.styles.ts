'use client'

import { styled } from '@mui/system';
import { TableContainer, type TableContainerProps } from '@mui/material';

export const HomeTableContainer = styled(TableContainer)<TableContainerProps>(({theme}) => ({
	marginTop: '100px',
	marginBottom: '100px',
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '400px',
	[theme.breakpoints.up('sm')]: {
		marginTop: '180px',
		marginBottom: '180px',
		maxWidth: '800px',
	}
}));