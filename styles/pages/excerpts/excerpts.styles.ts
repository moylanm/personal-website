'use client'

import { styled } from '@mui/system';
import Link from 'next/link';
import { Container } from '@mui/material';
import { MAIN_COLOR } from '@/styles/theme/constants';

export const ExcerptLink = styled(Link)({
	'&:hover': {
		textDecoration: 'underline'
	},
	textDecoration: 'none',
	color: MAIN_COLOR
});

export const ExcerptContainer = styled(Container)({
	marginTop: '130px',
	marginBottom: '110px'
});