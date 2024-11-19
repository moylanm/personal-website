'use client'

import { styled } from '@mui/system';
import { Container, Card, Grid2, type Grid2Props } from '@mui/material';

export const AboutContainer = styled(Container)({
	marginLeft: 'auto',
	marginRight: 'auto',
	maxWidth: '800px'
});

export const AboutGrid2 = styled(Grid2)<Grid2Props>(({theme}) => ({
	minHeight: '75vh',
	alignItems: 'center',
	justifyContent: 'center',
	[theme.breakpoints.down('sm')]: {
		marginBottom: '50px'
	}
}));

export const AboutCard = styled(Card)({
	maxWidth: '750px',
	padding: '30px'
});