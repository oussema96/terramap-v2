'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { FormInput } from './FormInput';
import { useAuth } from './AuthContext';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  return null;
}

export function ForgotPasswordForm({ onSwitchToLogin }: ForgotPasswordFormProps) {
  const { resetPassword, loading, error: authError, clearError } = useAuth();

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearError();

    if (!validate()) return;

    const result = await resetPassword(email);
    if (result.success) {
      setSuccess(true);
    }
  };

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

  if (success) {
    return (
      <div className="auth-form auth-success-state">
        <div className="auth-success-icon">
          <CheckCircle size={48} />
        </div>
        <h2 className="auth-title">Check your email</h2>
        <p className="auth-subtitle">
          We&apos;ve sent a password reset link to <strong>{email}</strong>. 
          Check your inbox and follow the instructions.
        </p>
        <button
          type="button"
          className="auth-submit-btn auth-submit-btn-secondary"
          onClick={onSwitchToLogin}
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="auth-form">
      <div className="auth-form-header">
        <h1 className="auth-title">Reset your password</h1>
        <p className="auth-subtitle">
          Enter the email associated with your account and we&apos;ll send you a link to reset your password.
        </p>
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

      <button
        type="submit"
        className="auth-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Sending…
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <p className="auth-footer-text">
        <button type="button" className="auth-link-btn auth-back-link" onClick={onSwitchToLogin}>
          <ArrowLeft size={14} />
          Back to Sign In
        </button>
      </p>
    </form>
  );
}
