import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authServices';
import { storage } from '../utils/storage';

// Authentication states
const AUTH_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  ERROR: 'error'
};

// Action types
const AUTH_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_AUTHENTICATED: 'SET_AUTHENTICATED',
  SET_UNAUTHENTICATED: 'SET_UNAUTHENTICATED',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
  status: AUTH_STATES.IDLE,
  error: null
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: true,
        status: AUTH_STATES.LOADING,
        error: null
      };

    case AUTH_ACTIONS.SET_AUTHENTICATED:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        status: AUTH_STATES.AUTHENTICATED,
        error: null
      };

    case AUTH_ACTIONS.SET_UNAUTHENTICATED:
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        status: AUTH_STATES.UNAUTHENTICATED,
        error: null
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        status: AUTH_STATES.ERROR,
        error: action.payload
      };

    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}

// Create context
const AuthContext = createContext(null);

// Auth Provider component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    initializeAuth();
  }, []);

  // Initialize authentication
  const initializeAuth = async () => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });
      
      const token = storage.getToken();
      const refreshToken = storage.getRefreshToken();
      const userData = storage.getUser();

      if (token && userData) {
        // Verify token validity (you can add API call here)
        const isValidToken = await authService.verifyToken(token);
        
        if (isValidToken) {
          dispatch({
            type: AUTH_ACTIONS.SET_AUTHENTICATED,
            payload: {
              user: userData,
              token,
              refreshToken
            }
          });
        } else {
          // Try to refresh token
          if (refreshToken) {
            await handleRefreshToken();
          } else {
            logout();
          }
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: 'Failed to initialize authentication'
      });
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });

      const response = await authService.login(credentials);
      const { user, token, refreshToken } = response;

      // Store in localStorage
      storage.setToken(token);
      storage.setRefreshToken(refreshToken);
      storage.setUser(user);

      dispatch({
        type: AUTH_ACTIONS.SET_AUTHENTICATED,
        payload: { user, token, refreshToken }
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed';
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING });

      const response = await authService.register(userData);
      const { user, token, refreshToken } = response;

      // Store in localStorage
      storage.setToken(token);
      storage.setRefreshToken(refreshToken);
      storage.setUser(user);

      dispatch({
        type: AUTH_ACTIONS.SET_AUTHENTICATED,
        payload: { user, token, refreshToken }
      });

      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear storage regardless of API call success
      storage.clearAuth();
      dispatch({ type: AUTH_ACTIONS.SET_UNAUTHENTICATED });
    }
  };

  // Refresh token function
  const handleRefreshToken = async () => {
    try {
      const refreshToken = storage.getRefreshToken();
      if (!refreshToken) {
        logout();
        return;
      }

      const response = await authService.refreshToken(refreshToken);
      const { token: newToken, refreshToken: newRefreshToken } = response;

      storage.setToken(newToken);
      if (newRefreshToken) {
        storage.setRefreshToken(newRefreshToken);
      }

      dispatch({
        type: AUTH_ACTIONS.SET_AUTHENTICATED,
        payload: {
          user: state.user,
          token: newToken,
          refreshToken: newRefreshToken || refreshToken
        }
      });

      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      logout();
      return null;
    }
  };

  // Update user profile
  const updateProfile = async (updates) => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      storage.setUser(updatedUser);
      dispatch({
        type: AUTH_ACTIONS.UPDATE_USER,
        payload: updatedUser
      });
      return { success: true, user: updatedUser };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Profile update failed';
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: errorMessage
      });
      return { success: false, error: errorMessage };
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Password reset request
  const requestPasswordReset = async (email) => {
    try {
      await authService.requestPasswordReset(email);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset request failed';
      return { success: false, error: errorMessage };
    }
  };

  // Password reset
  const resetPassword = async (token, newPassword) => {
    try {
      await authService.resetPassword(token, newPassword);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Password reset failed';
      return { success: false, error: errorMessage };
    }
  };

  // Context value
  const value = {
    // State
    ...state,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    clearError,
    requestPasswordReset,
    resetPassword,
    refreshToken: handleRefreshToken,
    
    // Utilities
    AUTH_STATES,
    isInitialized: state.status !== AUTH_STATES.IDLE
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AUTH_STATES, AUTH_ACTIONS };
