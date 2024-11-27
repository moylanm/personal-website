jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: jest.fn(),
}));

jest.mock('@/styles', () => ({
  LoginFormContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="login-container">{children}</div>,
  LoginFormCard: ({ children }: { children: React.ReactNode }) => <div data-testid="login-card">{children}</div>,
  LoginButton: ({ children, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => 
    <button data-testid="login-button" {...props}>{children}</button>,
}));

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/components/login/LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

describe('LoginForm', () => {
  const mockRouter = {
    replace: jest.fn(),
  };
  const mockFormAction = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useActionState as jest.Mock).mockReturnValue([null, mockFormAction, false]);
  });

  it('renders login form with all fields', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('shows loading state when form is submitting', () => {
    (useActionState as jest.Mock).mockReturnValue([null, mockFormAction, true]);

    render(<LoginForm />);

    expect(screen.getByTestId('login-button')).toBeDisabled();
  });

  it('displays error message when authentication fails', () => {
    (useActionState as jest.Mock).mockReturnValue(['Invalid credentials.', mockFormAction, false]);

    render(<LoginForm />);

    expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
  });

  it('redirects to dashboard on successful login', async () => {
    type ActionCallback = (prevState: unknown, formData: FormData) => Promise<string | null>;
    let actionCallback: ActionCallback = async () => null;

    (useActionState as jest.Mock).mockImplementation((callback) => {
      actionCallback = callback;
      return [null, jest.fn().mockImplementation(async (formData: FormData) => {
        return await callback(null, formData);
      }), false];
    });

    render(<LoginForm />);

    // Simulate successful sign in
    (signIn as jest.Mock).mockResolvedValueOnce({ ok: true });

    // Create FormData and call the action callback directly
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');

    await actionCallback(null, formData);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      });
      expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('handles sign in error correctly', async () => {
    const mockActionState = jest.fn();
    (useActionState as jest.Mock).mockImplementation((callback) => {
      mockActionState.mockReturnValue(['Authentication failed.', callback, false]);
      return ['Authentication failed.', callback, false];
    });

    render(<LoginForm />);

    const form = screen.getByRole('form');

    // Simulate failed sign in
    (signIn as jest.Mock).mockRejectedValueOnce(new Error('Auth failed'));

    // Trigger form submission
    form.dispatchEvent(new Event('submit'));

    await waitFor(() => {
      expect(screen.getByText('Authentication failed.')).toBeInTheDocument();
    });
  });

  it('handles invalid credentials error', async () => {
    const mockActionState = jest.fn();
    (useActionState as jest.Mock).mockImplementation((callback) => {
      mockActionState.mockReturnValue(['Invalid credentials.', callback, false]);
      return ['Invalid credentials.', callback, false];
    });

    render(<LoginForm />);

    const form = screen.getByRole('form');

    // Simulate invalid credentials response
    (signIn as jest.Mock).mockResolvedValueOnce({ error: 'Invalid credentials' });

    // Trigger form submission
    form.dispatchEvent(new Event('submit'));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials.')).toBeInTheDocument();
    });
  });

  it('allows user input in form fields', async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});
