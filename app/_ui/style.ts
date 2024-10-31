'use client'

import { Container, styled } from '@mui/system';
import type { TableContainerProps } from '@mui/material';
import { Card, FormControl, Grid2, TableContainer } from '@mui/material';
import Link, { type LinkProps } from 'next/link';

export const StyledTableContainer = styled(TableContainer)<TableContainerProps>({
	marginTop: '180px',
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

export const StyledContainer = styled(Container)({
	marginTop: '150px',
	marginBottom: '150px',
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '800px'
});

export const StyledGrid2 = styled(Grid2)({
	alignItems: 'center',
	justifyContent: 'center',
});

export const StyledCard = styled(Card)({
	padding: '30px'
})

export const FilterFormContainer = styled(Container)(({theme}) => ({
	position: 'relative',
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
	[theme.breakpoints.up(600)]: {
		flexDirection: 'row'
	},
}));

export const FilterFormControl = styled(FormControl)(({theme}) => ({
	marginRight: '0px',
	[theme.breakpoints.up(600)]: {
		marginRight: '25px'
	},
}));
