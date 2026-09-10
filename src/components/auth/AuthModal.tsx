'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Lock, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { cn } from '@/lib/utils';
import '@/app/auth/auth.css';

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  title?: string;
  description?: string;
}

type ModalAuthView = 'login' | 'signup' | 'forgot';

export function AuthModal({
  isOpen,
  onOpenChange,
  onSuccess,
  title = 'Sign In Required to List Property',
  description = 'You must be signed in or registered to draw property boundaries and publish listings on TerraLink.',
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<ModalAuthView>('login');

  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        
        <Dialog.Content className="fixed inset-0 z-[2000] flex h-full w-full flex-col overflow-hidden bg-white text-slate-900 dark:bg-[#15181e] dark:text-gray-100 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 sm:inset-auto sm:left-[50%] sm:top-[50%] sm:h-auto sm:max-h-[90vh] sm:max-w-[540px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-3xl sm:border sm:border-slate-200 dark:sm:border-white/10 sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95">
          
          {/* Header */}
          <div className="relative border-b border-slate-200 dark:border-white/10 px-4 sm:px-6 py-4 sm:py-5 shrink-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 min-w-0">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Lock className="h-5 w-5 stroke-[2.2px]" />
                </div>
                <div className="min-w-0">
                  <Dialog.Title className="text-base sm:text-lg font-bold text-slate-900 dark:text-gray-100 flex items-center gap-2">
                    {title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-0.5 sm:mt-1 text-xs text-slate-500 dark:text-gray-400 leading-relaxed max-w-sm">
                    {description}
                  </Dialog.Description>
                </div>
              </div>

              <Dialog.Close className="h-9 w-9 sm:h-8 sm:w-8 shrink-0 flex items-center justify-center rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <X className="h-5 w-5" />
              </Dialog.Close>
            </div>

            {/* Navigation Tabs (Login / Register) */}
            {activeTab !== 'forgot' && (
              <div className="mt-3.5 sm:mt-4 flex rounded-xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 text-center',
                    activeTab === 'login'
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/5'
                  )}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className={cn(
                    'flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 text-center',
                    activeTab === 'signup'
                      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-white/5'
                  )}
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Form Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 custom-scrollbar">
            {activeTab === 'login' && (
              <LoginForm
                onSuccess={handleSuccess}
                onSwitchToSignup={() => setActiveTab('signup')}
                onSwitchToForgot={() => setActiveTab('forgot')}
              />
            )}

            {activeTab === 'signup' && (
              <SignupForm
                onSuccess={handleSuccess}
                onSwitchToLogin={() => setActiveTab('login')}
              />
            )}

            {activeTab === 'forgot' && (
              <div>
                <div className="mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('login')}
                    className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    ← Back to Sign In
                  </button>
                </div>
                <ForgotPasswordForm onSwitchToLogin={() => setActiveTab('login')} />
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="border-t border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.02] px-4 sm:px-6 py-3 shrink-0 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400/90 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Demo mode: Any credentials work</span>
            </div>
            <a
              href="/auth?redirect=list"
              className="hidden sm:flex items-center gap-1 text-slate-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              title="Open full page login"
            >
              <span>Full page</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
