'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				main: {
					marginTop: '70px',
					paddingBottom: '30px'
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
