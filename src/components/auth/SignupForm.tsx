'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { Loader2, CheckCircle } from 'lucide-react';
import { FormInput } from './FormInput';
import { PasswordInput, calculatePasswordStrength } from './PasswordInput';
import { SocialLoginButtons } from './SocialLoginButtons';
import { useAuth } from './AuthContext';

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
  if (!/[0-9]/.test(password)) return 'Password must contain a number';
  return null;
}

export function SignupForm({ onSwitchToLogin, onSuccess }: SignupFormProps) {
  const { signup, loading, error: authError, clearError } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = calculatePasswordStrength(password);

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    else if (fullName.trim().length < 2) newErrors.fullName = 'Name must be at least 2 characters';

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms & conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fullName, email, password, confirmPassword, agreedToTerms]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearError();

    if (!validate()) return;

    const result = await signup({ fullName: fullName.trim(), email, password });
    if (result.success) {
      setSuccess(true);
    }
  };

  // Live validation helpers
  const updateField = (
    field: string,
    value: string,
    validatorFn?: (v: string) => string | null
  ) => {
    if (submitted) {
      setErrors((prev) => {
        const next = { ...prev };
        if (validatorFn) {
          const err = validatorFn(value);
          if (err) next[field] = err;
          else delete next[field];
        } else {
          if (!value.trim()) next[field] = `${field} is required`;
          else delete next[field];
        }
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
        <h2 className="auth-title">Account created!</h2>
        <p className="auth-subtitle">
          Welcome to TerraLink. You can now explore the marketplace.
        </p>
        <button
          type="button"
          className="auth-submit-btn"
          onClick={() => {
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
          }}
        >
          {onSuccess ? 'Continue to List Property' : 'Go to Dashboard'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="auth-form">
      <div className="auth-form-header">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Join TerraLink and discover land opportunities</p>
      </div>

      {authError && (
        <div className="auth-alert auth-alert-error" role="alert">
          <span>{authError}</span>
        </div>
      )}

      <FormInput
        label="Full name"
        type="text"
        placeholder="John Doe"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
          updateField('fullName', e.target.value);
        }}
        error={errors.fullName}
        required
        autoComplete="name"
        autoFocus
      />

      <FormInput
        label="Email address"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          updateField('email', e.target.value, validateEmail);
        }}
        error={errors.email}
        required
        autoComplete="email"
      />

      <PasswordInput
        label="Password"
        placeholder="Create a strong password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          updateField('password', e.target.value, validatePassword);
        }}
        error={errors.password}
        required
        showStrength
        strengthValue={passwordStrength}
        autoComplete="new-password"
      />

      <PasswordInput
        label="Confirm password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (submitted) {
            setErrors((prev) => {
              const next = { ...prev };
              if (!e.target.value) next.confirmPassword = 'Please confirm your password';
              else if (e.target.value !== password) next.confirmPassword = 'Passwords do not match';
              else delete next.confirmPassword;
              return next;
            });
          }
        }}
        error={errors.confirmPassword}
        required
        autoComplete="new-password"
      />

      <label className="auth-checkbox-label auth-terms-label" htmlFor="agree-terms">
        <input
          id="agree-terms"
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => {
            setAgreedToTerms(e.target.checked);
            if (submitted) {
              setErrors((prev) => {
                const next = { ...prev };
                if (e.target.checked) delete next.terms;
                else next.terms = 'You must agree to the terms & conditions';
                return next;
              });
            }
          }}
          className="auth-checkbox"
        />
        <span className="auth-checkbox-custom" />
        <span>
          I agree to the{' '}
          <a href="#" className="auth-link" onClick={(e) => e.preventDefault()}>
            Terms & Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="auth-link" onClick={(e) => e.preventDefault()}>
            Privacy Policy
          </a>
        </span>
      </label>
      {errors.terms && (
        <p className="auth-error-text" role="alert">{errors.terms}</p>
      )}

      <button
        type="submit"
        className="auth-submit-btn"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="auth-spinner" />
            Creating account…
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <SocialLoginButtons disabled={loading} />

      <p className="auth-footer-text">
        Already have an account?{' '}
        <button type="button" className="auth-link-btn" onClick={onSwitchToLogin}>
          Sign in
        </button>
      </p>
    </form>
  );
}
