'use client';

import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, className, id: externalId, ...props }, ref) => {
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const errorId = `${inputId}-error`;

    return (
      <div className="auth-form-group">
        <label htmlFor={inputId} className="auth-label">
          {label}
          {props.required && <span className="auth-required">*</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={cn('auth-input', error && 'auth-input-error', className)}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="auth-error-text" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="auth-hint-text">{hint}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

export { FormInput };
