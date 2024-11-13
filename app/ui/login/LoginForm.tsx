'use client';

import { useActionState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoginFormContainer, LoginFormCard } from '../style';
import { signIn } from 'next-auth/react';
import { AuthError } from 'next-auth';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      try {
        await signIn('credentials', {
          email: formData.get('email'),
          password: formData.get('password'),
          redirectTo: '/dashboard',
        });
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case 'CredentialsSignin':
              return 'Invalid credentials.';
            default:
              return 'Something went wrong.';
          }
        }
        throw error;
      }
    },
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
          {errorMessage && <Box sx={{ textAlign: 'center' }}>{errorMessage}</Box>}
        </LoginFormCard>
      </LoginFormContainer>
    </>
  );
}
