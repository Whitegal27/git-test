import React from 'react';
import { useAuth } from '../contexts/AuthContext';

// Higher-order component for protecting routes
export function withAuth(WrappedComponent, options = {}) {
  const {
    redirectTo = '/login',
    requiredRoles = [],
    fallback = null,
    requireEmailVerification = false
  } = options;

  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isLoading, user } = useAuth();

    // Show loading state
    if (isLoading) {
      return fallback || <div>Loading...</div>;
    }

    // Redirect if not authenticated
    if (!isAuthenticated) {
      if (typeof window !== 'undefined' && redirectTo) {
        window.location.href = redirectTo;
        return null;
      }
      return fallback || <div>Please log in to access this page.</div>;
    }

    // Check email verification if required
    if (requireEmailVerification && user && !user.emailVerified) {
      return fallback || <div>Please verify your email to access this page.</div>;
    }

    // Check user roles if specified
    if (requiredRoles.length > 0) {
      const userRoles = user?.roles || [];
      const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
      
      if (!hasRequiredRole) {
        return fallback || <div>You don&apos;t have permission to access this page.</div>;
      }
    }

    return <WrappedComponent {...props} />;
  };
}

// Component for protecting routes
export function ProtectedRoute({ 
  children, 
  redirectTo = '/login', 
  requiredRoles = [],
  fallback = null,
  requireEmailVerification = false 
}) {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading state
  if (isLoading) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    if (typeof window !== 'undefined' && redirectTo) {
      window.location.href = redirectTo;
      return null;
    }
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  // Check email verification if required
  if (requireEmailVerification && user && !user.emailVerified) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Email Verification Required</h2>
          <p className="text-muted-foreground">Please verify your email to access this page.</p>
        </div>
      </div>
    );
  }

  // Check user roles if specified
  if (requiredRoles.length > 0) {
    const userRoles = user?.roles || [];
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      return fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don&apos;t have permission to access this page.</p>
          </div>
        </div>
      );
    }
  }

  return children;
}

// Component for showing content only to authenticated users
export function AuthenticatedOnly({ children, fallback = null }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return fallback;
  }

  return isAuthenticated ? children : fallback;
}

// Component for showing content only to unauthenticated users
export function UnauthenticatedOnly({ children, fallback = null }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return fallback;
  }

  return !isAuthenticated ? children : fallback;
}

// Component for role-based content
export function RoleBasedContent({ 
  children, 
  requiredRoles = [], 
  fallback = null,
  requireAll = false 
}) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return fallback;
  }

  if (requiredRoles.length === 0) {
    return children;
  }

  const userRoles = user?.roles || [];
  
  const hasAccess = requireAll
    ? requiredRoles.every(role => userRoles.includes(role))
    : requiredRoles.some(role => userRoles.includes(role));

  return hasAccess ? children : fallback;
}

// Hook for checking permissions
export function usePermissions() {
  const { user, isAuthenticated } = useAuth();

  const hasRole = (role) => {
    if (!isAuthenticated || !user) return false;
    return user.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles) => {
    if (!isAuthenticated || !user) return false;
    return roles.some(role => user.roles?.includes(role)) || false;
  };

  const hasAllRoles = (roles) => {
    if (!isAuthenticated || !user) return false;
    return roles.every(role => user.roles?.includes(role)) || false;
  };

  const canAccess = (permission) => {
    if (!isAuthenticated || !user) return false;
    return user.permissions?.includes(permission) || false;
  };

  const isOwner = (resourceUserId) => {
    if (!isAuthenticated || !user) return false;
    return user.id === resourceUserId;
  };

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    canAccess,
    isOwner,
    userRoles: user?.roles || [],
    userPermissions: user?.permissions || []
  };
}
