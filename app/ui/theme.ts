'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					paddingTop: '65px'
				}
			}
		}
	},
	palette: {
		mode: 'dark'
	},
	typography: {
		fontFamily: 'var(--font-merriweather)',
	},
	
});

export default theme;
