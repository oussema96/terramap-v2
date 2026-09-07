'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { Loader2 } from 'lucide-react';
import { FormInput } from './FormInput';
import { PasswordInput } from './PasswordInput';
import { SocialLoginButtons } from './SocialLoginButtons';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onSwitchToForgot: () => void;
  onSuccess?: () => void;
}

function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  return null;
}

export function LoginForm({ onSwitchToSignup, onSwitchToForgot, onSuccess }: LoginFormProps) {
  const { login, loading, error: authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearError();

    if (!validate()) return;

    const result = await login({ email, password, rememberMe });
    if (result.success) {
      if (onSuccess) {
        onSuccess();
      } else {
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect');
        if (redirect) {
          window.location.href = redirect.startsWith('/') ? redirect : `/${redirect}`;
        } else {
          window.location.href = '/';
        }
      }
    }
  };

  // Live validation after first submission attempt
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (submitted) {
      const err = validateEmail(value);
      setErrors((prev) => {
        const next = { ...prev };
        if (err) next.email = err;
        else delete next.email;
        return next;
      });
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (submitted) {
      setErrors((prev) => {
        const next = { ...prev };
        if (!value) next.password = 'Password is required';
        else delete next.password;
        return next;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="auth-form">
      <div className="auth-form-header">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your TerraLink account</p>
      </div>

      {authError && (
        <div className="auth-alert auth-alert-error" role="alert">
          <span>{authError}</span>
        </div>
      )}

      <FormInput
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        error={errors.email}
        required
        autoComplete="email"
        autoFocus
      />

      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        error={errors.password}
        required
        autoComplete="current-password"
      />

      <div className="auth-options-row">
        <label className="auth-checkbox-label" htmlFor="remember-me">
          <input
            id="remember-me"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="auth-checkbox"
          />
          <span className="auth-checkbox-custom" />
          <span>Remember me</span>
        </label>
        <button
          type="button"
          className="auth-link-btn"
          onClick={onSwitchToForgot}
        >
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        className="auth-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Signing in…
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <SocialLoginButtons disabled={loading} />

      <p className="auth-footer-text">
        Don&apos;t have an account?{' '}
        <button type="button" className="auth-link-btn" onClick={onSwitchToSignup}>
          Create an account
        </button>
      </p>
    </form>
  );
}
