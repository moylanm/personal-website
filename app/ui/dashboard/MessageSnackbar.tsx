import type React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';

type SnackbarProps = {
  response: string;
  severity: 'success' | 'error';
  handleClose: () => void;
};

const MessageSnackbar: React.FC<SnackbarProps> = ({
  response,
  severity,
  handleClose
}) => {
  return (
    <Snackbar
      open={true}
      autoHideDuration={5000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant='filled'
      >
        <Typography>
          {response}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default MessageSnackbar;