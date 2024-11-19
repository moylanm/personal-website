'use client'

import { styled } from '@mui/system';
import { Container, Paper } from '@mui/material';

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