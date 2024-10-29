import type React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Typography } from '@mui/material';

type ResponseSnackbarProps = {
  open: boolean;
  response: string;
  severity: 'success' | 'error';
  handleClose: () => void;
};

const MessageSnackbar: React.FC<ResponseSnackbarProps> = ({
  open,
  response,
  severity,
  handleClose
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant='filled'
      >
        <Typography sx={{ padding: 0 }} >
          {response}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default MessageSnackbar;
