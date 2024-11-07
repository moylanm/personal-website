'use client';

import { authenticate } from '@/lib/actions';
import { useActionState } from 'react';
import { Button, TextField } from '@mui/material';
import { LoginFormContainer, LoginFormCard } from '../style';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <>
      <LoginFormContainer>
        <LoginFormCard>
          <form action={formAction}>
            <TextField fullWidth type='email' id='email' name='email' label='Email' margin='normal' />
            <br />
            <TextField fullWidth type='password' id='password' name='password' label='Password' margin='normal' />
            <br />
            <Button type='submit' disabled={isPending}>
              Login
            </Button>
          </form>
          {errorMessage && <div>{errorMessage}</div>}
        </LoginFormCard>
      </LoginFormContainer>
    </>
  );
}
