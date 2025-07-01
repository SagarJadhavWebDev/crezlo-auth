import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LoginCard } from './LoginCard';
import { AuthGuardProps } from '../types';

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback,
  requireAuth = true,
  loadingComponent = (
    <div className="flex justify-center items-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  )
}) => {
  const { isAuthenticated, isInitialized } = useAuth();

  // Show loading during SSR hydration
  if (!isInitialized) {
    return <>{loadingComponent}</>;
  }

  // Require authentication but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <>{fallback || <LoginCard />}</>;
  }

  // Don't require authentication but user is authenticated (e.g., login page)
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};