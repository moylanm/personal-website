'use client'

import { styled } from '@mui/system';
import Link, { type LinkProps } from 'next/link';
import { Container } from '@mui/material';
import { MAIN_COLOR } from '../../theme/constants';

export const ExcerptLink = styled(Link)<LinkProps>({
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