'use client'

import { styled } from '@mui/system';
import {
  Box,
  Paper,
  Button,
  Radio,
  Checkbox,
  type ButtonProps,
  type CheckboxProps
} from '@mui/material';

const FILTER_FORM_COLOR = '#808080';

export const FilterFormPaper = styled(Paper)(({theme}) => ({
	position: 'fixed',
	top: theme.spacing(11),
	height: `calc(100vh - ${theme.spacing(4)} - 140px)`,
	padding: theme.spacing(2),
	display: 'flex',
	flexDirection: 'column',
	width: '300px',
	overflow: 'hidden'
}));

export const FilterFormButton = styled(Button)<ButtonProps>({
	color: 'white',
	borderColor: FILTER_FORM_COLOR,
	'&:hover': {
		borderColor: FILTER_FORM_COLOR,
		backgroundColor: 'rgba(128, 128, 128, 0.15)'
	}
});

export const FilterFormRadio = styled(Radio)({
	color: FILTER_FORM_COLOR,
	'&.Mui-checked': {
		color: FILTER_FORM_COLOR,
	}
});

export const FilterFormCheckbox = styled(Checkbox)<CheckboxProps>({
  '&.Mui-checked': {
    color: FILTER_FORM_COLOR,
  }
});

export const ScrollableSection = styled(Box)({
	overflowY: 'auto',
	overflowX: 'hidden',
	flex: 1,
	width: '100%'
});

export const WorksList = styled(Box)(({theme}) => ({
	marginLeft: theme.spacing(3),
	display: 'flex',
	flexDirection: 'column',
	'& .MuiFormControlLabel-root': {
		margin: 0,
		width: '100%',
		'& .MuiFormControlLabel-label': {
			width: '100%',
			wordBreak: 'break-word',
			whitespace: 'normal',
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		}
	}
}));
