import type { Metadata } from 'next';
import LoginForm from '@/app/_ui/login-form';

export const metadata: Metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return <LoginForm />;
}
