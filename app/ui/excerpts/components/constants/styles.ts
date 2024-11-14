export const DRAWER_WIDTH = 300;
export const MAIN_APPBAR_HEIGHT = 64;

export const COMMON_FORM_STYLES = {
  width: '100%',
  margin: 0,
  '& .MuiFormControlLabel-label': {
    width: '100%',
    wordBreak: 'break-word'
  }
} as const;

export const DRAWER_STYLES = {
  display: { xs: 'block', md: 'none' },
  '& .MuiDrawer-paper': { 
    boxSizing: 'border-box', 
    width: DRAWER_WIDTH,
    top: `${MAIN_APPBAR_HEIGHT + 48}px`,
    height: `calc(100% - ${MAIN_APPBAR_HEIGHT + 48}px)`,
    '& .MuiPaper-root': {
      position: 'static',
      height: '100%',
      top: 0
    }
  },
} as const;
