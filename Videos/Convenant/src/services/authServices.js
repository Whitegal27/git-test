// Base API configuration
const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000, // 10 seconds
  endpoints: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    verify: '/auth/verify',
    profile: '/auth/profile',
    resetPassword: '/auth/reset-password',
    requestPasswordReset: '/auth/request-password-reset'
  }
};

// HTTP status codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

// Custom error class for API errors
class APIError extends Error {
  constructor(message, status, response) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.response = response;
  }
}

// HTTP client class
class HTTPClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || API_CONFIG.baseURL;
    this.timeout = config.timeout || API_CONFIG.timeout;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers
    };
  }

  // Create request configuration
  createRequestConfig(config = {}) {
    return {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...config.headers },
      ...config
    };
  }

  // Handle API response
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    let data;
    try {
      data = isJson ? await response.json() : await response.text();
    } catch (error) {
      data = null;
    }

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP ${response.status}`;
      throw new APIError(errorMessage, response.status, data);
    }

    return data;
  }

  // Generic request method
  async request(endpoint, config = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    const requestConfig = this.createRequestConfig(config);

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    requestConfig.signal = controller.signal;

    try {
      const response = await fetch(url, requestConfig);
      clearTimeout(timeoutId);
      return await this.handleResponse(response);
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new APIError('Request timeout', 408);
      }
      
      if (error instanceof APIError) {
        throw error;
      }
      
      // Network or other errors
      throw new APIError(error.message || 'Network error', 0);
    }
  }

  // GET request
  async get(endpoint, params = {}, config = {}) {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    return this.request(url.toString(), {
      method: 'GET',
      ...config
    });
  }

  // POST request
  async post(endpoint, data = {}, config = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config
    });
  }

  // PUT request
  async put(endpoint, data = {}, config = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config
    });
  }

  // PATCH request
  async patch(endpoint, data = {}, config = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      ...config
    });
  }

  // DELETE request
  async delete(endpoint, config = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...config
    });
  }

  // Set authorization header
  setAuthToken(token) {
    if (token) {
      this.defaultHeaders.Authorization = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders.Authorization;
    }
  }

  // Remove authorization header
  clearAuthToken() {
    delete this.defaultHeaders.Authorization;
  }
}

// Authentication service
class AuthService {
  constructor() {
    this.httpClient = new HTTPClient();
  }

  // Set authentication token for all requests
  setAuthToken(token) {
    this.httpClient.setAuthToken(token);
  }

  // Clear authentication token
  clearAuthToken() {
    this.httpClient.clearAuthToken();
  }

  // Login user
  async login(credentials) {
    try {
      // For development/demo purposes, simulate API call with mock data
      if (import.meta.env.VITE_USE_MOCK_AUTH !== 'false') {
        return this.mockLogin(credentials);
      }
      
      const response = await this.httpClient.post(API_CONFIG.endpoints.login, credentials);
      
      // Set token for future requests
      if (response.token) {
        this.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Mock login for development
  async mockLogin(credentials) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Basic validation
    if (!credentials.email || !credentials.password) {
      throw new APIError('Email and password are required', 400);
    }
    
    // For demo, accept any email/password combination
    // In real app, this would validate against actual credentials
    const mockUser = {
      id: '1',
      name: 'Okapade',
      email: credentials.email,
      role: 'Compliance Officer',
      emailVerified: true,
      permissions: ['dashboard:read', 'accounts:read', 'reports:read'],
      roles: ['compliance_officer']
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    const mockRefreshToken = 'mock_refresh_token_' + Date.now();
    
    this.setAuthToken(mockToken);
    
    return {
      user: mockUser,
      token: mockToken,
      refreshToken: mockRefreshToken,
      message: 'Login successful'
    };
  }

  // Register user
  async register(userData) {
    try {
      // For development/demo purposes, simulate API call with mock data
      if (import.meta.env.VITE_USE_MOCK_AUTH !== 'false') {
        return this.mockRegister(userData);
      }
      
      const response = await this.httpClient.post(API_CONFIG.endpoints.register, userData);
      
      // Set token for future requests
      if (response.token) {
        this.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  // Mock register for development
  async mockRegister(userData) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Basic validation
    if (!userData.email || !userData.password || !userData.name) {
      throw new APIError('All fields are required', 400);
    }
    
    const mockUser = {
      id: '2',
      name: userData.name,
      email: userData.email,
      role: 'User',
      emailVerified: false,
      permissions: ['dashboard:read'],
      roles: ['user']
    };
    
    const mockToken = 'mock_jwt_token_' + Date.now();
    const mockRefreshToken = 'mock_refresh_token_' + Date.now();
    
    this.setAuthToken(mockToken);
    
    return {
      user: mockUser,
      token: mockToken,
      refreshToken: mockRefreshToken,
      message: 'Registration successful'
    };
  }

  // Logout user
  async logout() {
    try {
      await this.httpClient.post(API_CONFIG.endpoints.logout);
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw error for logout as we want to clear local state regardless
    } finally {
      this.clearAuthToken();
    }
  }

  // Refresh authentication token
  async refreshToken(refreshToken) {
    try {
      const response = await this.httpClient.post(API_CONFIG.endpoints.refresh, {
        refreshToken
      });
      
      // Update token for future requests
      if (response.token) {
        this.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  }

  // Verify token validity
  async verifyToken(token) {
    try {
      // For development/demo purposes, simulate token verification
      if (import.meta.env.VITE_USE_MOCK_AUTH !== 'false') {
        // Mock tokens are valid if they start with 'mock_jwt_token_'
        return token && token.startsWith('mock_jwt_token_');
      }
      
      await this.httpClient.get(API_CONFIG.endpoints.verify, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  // Get user profile
  async getProfile() {
    try {
      return await this.httpClient.get(API_CONFIG.endpoints.profile);
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(updates) {
    try {
      return await this.httpClient.patch(API_CONFIG.endpoints.profile, updates);
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Request password reset
  async requestPasswordReset(email) {
    try {
      return await this.httpClient.post(API_CONFIG.endpoints.requestPasswordReset, { email });
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  }

  // Reset password
  async resetPassword(token, newPassword) {
    try {
      return await this.httpClient.post(API_CONFIG.endpoints.resetPassword, {
        token,
        password: newPassword
      });
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  }
}

// Create and export service instances
export const httpClient = new HTTPClient();
export const authService = new AuthService();

// Export utilities
export { APIError, HTTP_STATUS, API_CONFIG };
