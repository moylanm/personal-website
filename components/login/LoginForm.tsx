'use client';

import { useActionState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoginFormContainer, LoginFormCard } from '@/styles';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();

  const [errorMessage, formAction, isPending] = useActionState(
    async (_: unknown, formData: FormData) => {
      const result = await signIn('credentials', {
        email: formData.get('email'),
        password: formData.get('password'),
        redirect: false,
      });

      if (result?.error) {
        return 'Invalid credentials.';
      }

      if (result?.ok) {
        router.push('/dashboard');
        return null;
      }

      return 'Something went wrong.';
    },
    undefined
  );

  return (
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
        {errorMessage && (
          <Box sx={{ textAlign: 'center', color: 'error.main', mt: 2 }}>
            {errorMessage}
          </Box>
        )}
      </LoginFormCard>
    </LoginFormContainer>
  );
}
