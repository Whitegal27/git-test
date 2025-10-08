// Storage keys
const STORAGE_KEYS = {
  TOKEN: 'convenant_token',
  REFRESH_TOKEN: 'convenant_refresh_token',
  USER: 'convenant_user',
  SETTINGS: 'convenant_settings'
};

// Storage utility class
class Storage {
  constructor() {
    this.isAvailable = this.checkStorageAvailability();
  }

  // Check if localStorage is available
  checkStorageAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Generic get method with error handling
  get(key) {
    if (!this.isAvailable) return null;
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      
      // Try to parse as JSON, return as string if parsing fails
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return null;
    }
  }

  // Generic set method with error handling
  set(key, value) {
    if (!this.isAvailable) return false;
    
    try {
      const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  }

  // Generic remove method
  remove(key) {
    if (!this.isAvailable) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  }

  // Clear all storage
  clear() {
    if (!this.isAvailable) return false;
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }

  // Authentication-specific methods
  getToken() {
    return this.get(STORAGE_KEYS.TOKEN);
  }

  setToken(token) {
    return this.set(STORAGE_KEYS.TOKEN, token);
  }

  removeToken() {
    return this.remove(STORAGE_KEYS.TOKEN);
  }

  getRefreshToken() {
    return this.get(STORAGE_KEYS.REFRESH_TOKEN);
  }

  setRefreshToken(refreshToken) {
    return this.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }

  removeRefreshToken() {
    return this.remove(STORAGE_KEYS.REFRESH_TOKEN);
  }

  getUser() {
    return this.get(STORAGE_KEYS.USER);
  }

  setUser(user) {
    return this.set(STORAGE_KEYS.USER, user);
  }

  removeUser() {
    return this.remove(STORAGE_KEYS.USER);
  }

  // Clear all authentication data
  clearAuth() {
    this.removeToken();
    this.removeRefreshToken();
    this.removeUser();
  }

  // Settings methods
  getSettings() {
    return this.get(STORAGE_KEYS.SETTINGS) || {};
  }

  setSettings(settings) {
    return this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  updateSettings(updates) {
    const currentSettings = this.getSettings();
    const updatedSettings = { ...currentSettings, ...updates };
    return this.set(STORAGE_KEYS.SETTINGS, updatedSettings);
  }

  // Utility method to check if user is logged in based on storage
  hasValidSession() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // Method to get all auth data at once
  getAuthData() {
    return {
      token: this.getToken(),
      refreshToken: this.getRefreshToken(),
      user: this.getUser()
    };
  }

  // Method to set all auth data at once
  setAuthData({ token, refreshToken, user }) {
    const results = {
      token: token ? this.setToken(token) : true,
      refreshToken: refreshToken ? this.setRefreshToken(refreshToken) : true,
      user: user ? this.setUser(user) : true
    };
    
    return Object.values(results).every(result => result === true);
  }

  // Get storage usage information
  getStorageInfo() {
    if (!this.isAvailable) {
      return { available: false, used: 0, remaining: 0 };
    }

    let used = 0;
    try {
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          used += localStorage[key].length + key.length;
        }
      }
    } catch (error) {
      console.error('Error calculating storage usage:', error);
    }

    const estimated_limit = 5 * 1024 * 1024; 
    const remaining = Math.max(0, estimated_limit - used);

    return {
      available: true,
      used: used,
      remaining: remaining,
      usedMB: (used / 1024 / 1024).toFixed(2),
      remainingMB: (remaining / 1024 / 1024).toFixed(2)
    };
  }

  // Method to cleanup old/expired data 
  cleanup() {
    // This is a placeholder for any cleanup logic
    console.log('Storage cleanup completed');
  }
}

// Create and export storage instance
export const storage = new Storage();

// Export storage keys for external use if needed
export { STORAGE_KEYS };
