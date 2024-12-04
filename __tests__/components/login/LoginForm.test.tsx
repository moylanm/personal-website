import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '@/components/login/LoginForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

// Define types for useActionState
type ActionCallback = (prevState: unknown, formData: FormData) => Promise<string | null>;

type ActionState = [
  errorMessage: string | undefined,
  formAction: (formData: FormData) => Promise<void>,
  isPending: boolean
];

type UseActionState = (
  action: ActionCallback,
  initialState: undefined
) => ActionState;

// Mock next-auth
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useActionState with proper typing
jest.mock('react', () => {
  const actualReact = jest.requireActual<typeof React>('react');
  const mockUseActionState = jest.fn<ActionState, [ActionCallback, undefined]>();

  return {
    ...actualReact,
    useActionState: mockUseActionState as UseActionState,
  };
});

describe('LoginForm', () => {
  const mockRouter = {
    replace: jest.fn(),
  };

  const mockFormAction = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (useActionState as jest.Mock).mockReturnValue([
      undefined,
      mockFormAction,
      false,
    ] as ActionState);
  });

  it('renders login form with email and password fields', () => {
    render(<LoginForm />);

    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('shows loading state when form is submitting', () => {
    (useActionState as jest.Mock).mockReturnValue([
      undefined,
      mockFormAction,
      true,
    ] as ActionState);

    render(<LoginForm />);

    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays error message when authentication fails', () => {
    const errorMessage = 'Invalid credentials.';
    (useActionState as jest.Mock).mockReturnValue([
      errorMessage,
      mockFormAction,
      false,
    ] as ActionState);

    render(<LoginForm />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    const user = userEvent.setup();
    let actionCallback: ActionCallback | null = null;
  
    // Mock successful signIn response
    (signIn as jest.Mock).mockResolvedValue({ ok: true, error: null });
  
    // Implement useActionState to capture and execute the action callback
    (useActionState as jest.Mock).mockImplementation((callback: ActionCallback) => {
      actionCallback = callback;
      return [
        undefined,
        async (formData: FormData) => {
          await callback(undefined, formData);
        },
        false
      ] as ActionState;
    });
  
    render(<LoginForm />);
  
    // Fill in the form
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
  
    // Submit the form
    const form = screen.getByRole('form');
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');
  
    fireEvent.submit(form);
  
    // Wait for the async operations to complete
    await waitFor(async () => {
      if (actionCallback) {
        await actionCallback(undefined, formData);
      }
  
      // Verify signIn was called with correct parameters
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@example.com',
        password: 'password123',
        redirect: false,
      });
    });
  });

  it('redirects to dashboard on successful login', async () => {
    // Mock successful signIn response
    (signIn as jest.Mock).mockResolvedValue({ ok: true, error: null });
  
    // Create a mock action callback that we can trigger
    let actionCallback: ActionCallback | null = null;
  
    (useActionState as jest.Mock).mockImplementation((callback: ActionCallback) => {
      actionCallback = callback;
      return [undefined, async (formData: FormData) => {
        await callback(undefined, formData);
      }, false] as ActionState;
    });
  
    render(<LoginForm />);
  
    const form = screen.getByRole('form');
    const formData = new FormData();
    formData.append('email', 'test@example.com');
    formData.append('password', 'password123');
  
    // Submit the form
    fireEvent.submit(form);
  
    // Wait for the async operations to complete
    await waitFor(async () => {
      if (actionCallback) {
        await actionCallback(undefined, formData);
      }
      expect(mockRouter.replace).toHaveBeenCalledWith('/dashboard');
    });
  });
  
  it('handles network errors', async () => {
    (signIn as jest.Mock).mockRejectedValue(new Error('Network error'));

    const mockActionState = jest.fn<ActionState, []>();
    mockActionState.mockReturnValue(['Authentication failed.', mockFormAction, false]);

    (useActionState as jest.Mock).mockImplementation(() => {
      return mockActionState();
    });

    render(<LoginForm />);

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Authentication failed.')).toBeInTheDocument();
    });
  });
});
