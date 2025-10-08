import { useAuth } from '../contexts/AuthContext';

// Custom hook for authentication with additional utilities
export function useAuthHelpers() {
  const auth = useAuth();

  // Login with error handling and validation
  const loginWithValidation = async (credentials) => {
    const { email, password } = credentials;
    
    // Basic validation
    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required'
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    return await auth.login(credentials);
  };

  // Register with validation
  const registerWithValidation = async (userData) => {
    const { email, password, confirmPassword, name } = userData;
    
    // Basic validation
    if (!email || !password || !name) {
      return {
        success: false,
        error: 'All fields are required'
      };
    }

    if (!isValidEmail(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }

    if (password.length < 8) {
      return {
        success: false,
        error: 'Password must be at least 8 characters long'
      };
    }

    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'Passwords do not match'
      };
    }

    return await auth.register(userData);
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!auth.isAuthenticated || !auth.user) return false;
    return auth.user.permissions?.includes(permission) || false;
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!auth.isAuthenticated || !auth.user) return false;
    return auth.user.roles?.includes(role) || false;
  };

  // Get user's display name
  const getDisplayName = () => {
    if (!auth.user) return '';
    return auth.user.displayName || auth.user.name || auth.user.email?.split('@')[0] || 'User';
  };

  // Get user's initials for avatar
  const getUserInitials = () => {
    if (!auth.user) return '';
    const name = getDisplayName();
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if user's email is verified
  const isEmailVerified = () => {
    return auth.user?.emailVerified || false;
  };

  // Check if user's profile is complete
  const isProfileComplete = () => {
    if (!auth.user) return false;
    const requiredFields = ['name', 'email'];
    return requiredFields.every(field => auth.user[field]);
  };

  // Get time until token expires (if available)
  const getTokenTimeRemaining = () => {
    if (!auth.token) return null;
    
    try {
      const payload = JSON.parse(atob(auth.token.split('.')[1]));
      const exp = payload.exp * 1000; // Convert to milliseconds
      const now = Date.now();
      const remaining = exp - now;
      
      return remaining > 0 ? remaining : 0;
    } catch {
      return null;
    }
  };

  // Check if token is about to expire (within 5 minutes)
  const isTokenExpiringSoon = () => {
    const remaining = getTokenTimeRemaining();
    if (remaining === null) return false;
    return remaining < 5 * 60 * 1000; // 5 minutes in milliseconds
  };

  return {
    ...auth,
    loginWithValidation,
    registerWithValidation,
    hasPermission,
    hasRole,
    getDisplayName,
    getUserInitials,
    isEmailVerified,
    isProfileComplete,
    getTokenTimeRemaining,
    isTokenExpiringSoon
  };
}

// Email validation utility
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Password strength checker
export function checkPasswordStrength(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password);

  let score = 0;
  let feedback = [];

  if (password.length >= minLength) {
    score++;
  } else {
    feedback.push(`At least ${minLength} characters`);
  }

  if (hasUpperCase) {
    score++;
  } else {
    feedback.push('One uppercase letter');
  }

  if (hasLowerCase) {
    score++;
  } else {
    feedback.push('One lowercase letter');
  }

  if (hasNumbers) {
    score++;
  } else {
    feedback.push('One number');
  }

  if (hasSpecialChars) {
    score++;
  } else {
    feedback.push('One special character');
  }

  let strength = 'weak';
  if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';

  return {
    score,
    strength,
    feedback,
    isValid: score >= 3
  };
}

// Form validation utilities
export const validation = {
  required: (value) => {
    if (!value || value.toString().trim() === '') {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    if (!isValidEmail(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return null;
  },

  password: (value) => {
    if (!value) return null;
    const strength = checkPasswordStrength(value);
    if (!strength.isValid) {
      return `Password needs: ${strength.feedback.join(', ')}`;
    }
    return null;
  },

  confirmPassword: (password) => (value) => {
    if (!value) return null;
    if (value !== password) {
      return 'Passwords do not match';
    }
    return null;
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  }
};

// Authentication status constants
export const AUTH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
};
