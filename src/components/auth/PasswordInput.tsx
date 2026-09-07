'use client';

import { useState, forwardRef, useId, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  showStrength?: boolean;
  strengthValue?: number; // 0-4
}

function getStrengthLabel(strength: number): string {
  switch (strength) {
    case 0: return 'Very weak';
    case 1: return 'Weak';
    case 2: return 'Fair';
    case 3: return 'Good';
    case 4: return 'Strong';
    default: return '';
  }
}

function getStrengthColor(strength: number): string {
  switch (strength) {
    case 0: return '#ef4444';
    case 1: return '#f97316';
    case 2: return '#eab308';
    case 3: return '#22c55e';
    case 4: return '#10b981';
    default: return 'transparent';
  }
}

/** Calculate password strength score 0-4 */
export function calculatePasswordStrength(password: string): number {
  let score = 0;
  if (!password) return 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, showStrength, strengthValue = 0, className, id: externalId, ...props }, ref) => {
    const [visible, setVisible] = useState(false);
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="auth-form-group">
        <label htmlFor={inputId} className="auth-label">
          {label}
          {props.required && <span className="auth-required">*</span>}
        </label>
        <div className="auth-password-wrapper">
          <input
            ref={ref}
            id={inputId}
            type={visible ? 'text' : 'password'}
            className={cn('auth-input auth-input-password', error && 'auth-input-error', className)}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          <button
            type="button"
            className="auth-password-toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {showStrength && props.value && (
          <div className="auth-strength-bar">
            <div className="auth-strength-track">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="auth-strength-segment"
                  style={{
                    backgroundColor: i < strengthValue ? getStrengthColor(strengthValue) : 'rgba(255,255,255,0.08)',
                  }}
                />
              ))}
            </div>
            <span
              className="auth-strength-label"
              style={{ color: getStrengthColor(strengthValue) }}
            >
              {getStrengthLabel(strengthValue)}
            </span>
          </div>
        )}

        {error && (
          <p id={errorId} className="auth-error-text" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
