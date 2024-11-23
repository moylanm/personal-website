'use client'

import { styled } from '@mui/system';
import { Button, Container, Paper } from '@mui/material';
import { MAIN_COLOR } from '@/styles/theme/constants';

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

export const LoginButton = styled(Button)({
	color: MAIN_COLOR
});