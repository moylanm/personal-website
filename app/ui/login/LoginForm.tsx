'use client';

import { authenticate } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { LoginFormContainer, LoginFormCard } from '../style';
import MessageSnackbar from './Snackbar';

export default function LoginForm() {
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  return (
    <>
      <LoginFormContainer>
        <LoginFormCard>
          <form action={formAction}>
            <TextField type='email' id='email' name='email' label='Email' margin='normal' required />
            <br />
            <TextField type='password' id='password' name='password' label='Password' margin='normal' required />
            <br />
            <Button type='submit' disabled={isPending}>
              Login
            </Button>
            {errorMessage &&
              <MessageSnackbar 
                open={snackbarOpen}
                severity='error'
                response={errorMessage}
                handleClose={handleSnackbarClose}
              />}
          </form>
        </LoginFormCard>
      </LoginFormContainer>
    </>
  );
}
