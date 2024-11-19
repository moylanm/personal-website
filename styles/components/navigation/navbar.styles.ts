'use client'

import { styled } from '@mui/system';
import { Button, type ButtonProps } from '@mui/material';
import { MAIN_COLOR } from '../../theme/constants';

export const NavbarButton = styled(Button)<ButtonProps>({
	textAlign: 'center',
	textTransform: 'capitalize',
	color: MAIN_COLOR,
	display: 'block'
});