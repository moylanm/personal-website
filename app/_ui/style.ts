'use client'

import { styled } from '@mui/system';
import type { TableContainerProps } from '@mui/material';
import { TableContainer } from '@mui/material';
import Link, { type LinkProps } from 'next/link';

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>({
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '800px',
	overflow: 'auto',
});

export const StyledLink = styled(Link)<LinkProps>({
	'&:hover': {
		textDecoration: 'underline'
	},
	textDecoration: 'none',
	color: '#62CB31'
});
