import type { Metadata } from 'next';
import LoginForm from '@/app/ui/login/LoginForm';

export const metadata: Metadata = {
  title: 'Login'
};

export default function LoginPage() {
  return <LoginForm />;
}
