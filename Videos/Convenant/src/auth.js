// Authentication exports
export { AuthProvider, useAuth, AUTH_STATES, AUTH_ACTIONS } from './contexts/AuthContext';

// Protected route components
export {
  ProtectedRoute,
  AuthenticatedOnly,
  UnauthenticatedOnly,
  RoleBasedContent,
  withAuth,
  usePermissions
} from './components/ProtectedRoute';

// Authentication helpers and hooks
export {
  useAuthHelpers,
  checkPasswordStrength,
  validation,
  AUTH_STATUS
} from './hooks/useAuthHelpers';

// Services
export {
  authService,
  httpClient,
  APIError,
  HTTP_STATUS,
  API_CONFIG
} from './services/authServices';

// Utilities
export { storage, STORAGE_KEYS } from './utils/storage';
