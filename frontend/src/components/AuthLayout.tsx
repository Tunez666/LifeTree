import type { ReactNode } from 'react';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}

function AuthLayout({
  title,
  description,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          Life<span>Tree</span>
        </div>

        <h1>{title}</h1>

        <p className="auth-description">{description}</p>

        {children}

        <div className="auth-footer">{footer}</div>
      </div>
    </div>
  );
}

export default AuthLayout;