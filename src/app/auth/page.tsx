'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, Shield, TrendingUp, Globe } from 'lucide-react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';
import './auth.css';

type AuthView = 'login' | 'signup' | 'forgot';

const viewVariants = {
  initial: { opacity: 0, x: 20, filter: 'blur(4px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, x: -20, filter: 'blur(4px)' },
};

const features = [
  {
    icon: MapPin,
    title: 'Interactive Map Discovery',
    description: 'Explore properties with precise boundaries on a real-time map.',
  },
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Every property listing is reviewed and verified for accuracy.',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Access pricing trends and analytics to make smart decisions.',
  },
];

export default function AuthPage() {
  const [view, setView] = useState<AuthView>('login');

  const switchView = useCallback((newView: AuthView) => {
    setView(newView);
  }, []);

  return (
    <div className="auth-page">
        {/* Branding panel — hidden on mobile */}
        <div className="auth-brand-panel">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <div className="auth-brand-logo-icon">
                <Globe strokeWidth={2.5} />
              </div>
              <h2 className="auth-brand-logo-text">
                Terra<span>Link</span>
              </h2>
            </div>
            <p className="auth-brand-tagline">Land Marketplace</p>

            <h3 className="auth-brand-heading">
              Discover, buy, and list land with confidence
            </h3>
            <p className="auth-brand-description">
              TerraLink connects buyers and sellers through an interactive mapping platform. 
              Browse verified agricultural and residential properties with precise boundaries, 
              utility data, and real-time market insights.
            </p>

            <div className="auth-features">
              {features.map((feature) => (
                <div key={feature.title} className="auth-feature-card">
                  <div className="auth-feature-icon">
                    <feature.icon />
                  </div>
                  <div className="auth-feature-text">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="auth-form-panel">
          <div className="auth-form-container">
            {/* Mobile branding header */}
            <div className="auth-mobile-header">
              <div className="auth-mobile-logo">
                <div className="auth-mobile-logo-icon">
                  <Globe size={18} strokeWidth={2.5} />
                </div>
                <span className="auth-mobile-logo-text">
                  Terra<span>Link</span>
                </span>
              </div>
              <p className="auth-mobile-tagline">Land Marketplace</p>
            </div>

            <AnimatePresence mode="wait">
              {view === 'login' && (
                <motion.div
                  key="login"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <LoginForm
                    onSwitchToSignup={() => switchView('signup')}
                    onSwitchToForgot={() => switchView('forgot')}
                  />
                </motion.div>
              )}

              {view === 'signup' && (
                <motion.div
                  key="signup"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <SignupForm onSwitchToLogin={() => switchView('login')} />
                </motion.div>
              )}

              {view === 'forgot' && (
                <motion.div
                  key="forgot"
                  variants={viewVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <ForgotPasswordForm onSwitchToLogin={() => switchView('login')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
  );
}
