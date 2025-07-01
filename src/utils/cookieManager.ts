export interface CookieOptions {
  expires?: Date | number; // Date object or days from now
  maxAge?: number; // seconds
  domain?: string;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export interface CookieManagerConfig {
  defaultPath?: string;
  defaultDomain?: string;
  defaultSecure?: boolean;
  defaultSameSite?: 'strict' | 'lax' | 'none';
  prefix?: string; // Prefix for all cookie names
}

export class CookieManager {
  private config: CookieManagerConfig;

  constructor(config: CookieManagerConfig = {}) {
    this.config = {
      defaultPath: '/',
      defaultSecure: typeof window !== 'undefined' ? window.location.protocol === 'https:' : false,
      defaultSameSite: 'lax',
      ...config,
    };
  }

  // Set a cookie
  set(name: string, value: string, options: CookieOptions = {}): boolean {
    if (typeof document === 'undefined') {
      console.warn('CookieManager: document is not available (SSR environment)');
      return false;
    }

    try {
      const cookieName = this.config.prefix ? `${this.config.prefix}${name}` : name;
      let cookieString = `${encodeURIComponent(cookieName)}=${encodeURIComponent(value)}`;

      // Handle expires
      if (options.expires) {
        if (typeof options.expires === 'number') {
          // Convert days to date
          const date = new Date();
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
          cookieString += `; expires=${date.toUTCString()}`;
        } else {
          cookieString += `; expires=${options.expires.toUTCString()}`;
        }
      }

      // Handle maxAge
      if (options.maxAge !== undefined) {
        cookieString += `; max-age=${options.maxAge}`;
      }

      // Handle path
      const path = options.path ?? this.config.defaultPath;
      if (path) {
        cookieString += `; path=${path}`;
      }

      // Handle domain
      const domain = options.domain ?? this.config.defaultDomain;
      if (domain) {
        cookieString += `; domain=${domain}`;
      }

      // Handle secure
      const secure = options.secure ?? this.config.defaultSecure;
      if (secure) {
        cookieString += '; secure';
      }

      // Handle httpOnly (note: this can't be set via JavaScript)
      if (options.httpOnly) {
        console.warn('CookieManager: httpOnly flag cannot be set via JavaScript');
      }

      // Handle sameSite
      const sameSite = options.sameSite ?? this.config.defaultSameSite;
      if (sameSite) {
        cookieString += `; samesite=${sameSite}`;
      }

      document.cookie = cookieString;
      return true;
    } catch (error) {
      console.error('CookieManager: Error setting cookie', error);
      return false;
    }
  }

  // Get a cookie value
  get(name: string): string | null {
    if (typeof document === 'undefined') {
      return null;
    }

    try {
      const cookieName = this.config.prefix ? `${this.config.prefix}${name}` : name;
      const encodedName = encodeURIComponent(cookieName);
      const cookies = document.cookie.split(';');

      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(`${encodedName}=`)) {
          return decodeURIComponent(cookie.substring(encodedName.length + 1));
        }
      }

      return null;
    } catch (error) {
      console.error('CookieManager: Error getting cookie', error);
      return null;
    }
  }

  // Get a cookie value and parse as JSON
  getJSON<T = any>(name: string): T | null {
    const value = this.get(name);
    if (value === null) return null;

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('CookieManager: Error parsing JSON cookie', error);
      return null;
    }
  }

  // Set a cookie with JSON value
  setJSON(name: string, value: any, options: CookieOptions = {}): boolean {
    try {
      const jsonString = JSON.stringify(value);
      return this.set(name, jsonString, options);
    } catch (error) {
      console.error('CookieManager: Error stringifying JSON cookie', error);
      return false;
    }
  }

  // Remove a cookie
  remove(name: string, options: Pick<CookieOptions, 'path' | 'domain'> = {}): boolean {
    return this.set(name, '', {
      ...options,
      expires: new Date(0), // Set to past date
      maxAge: 0,
    });
  }

  // Check if a cookie exists
  has(name: string): boolean {
    return this.get(name) !== null;
  }

  // Get all cookies as an object
  getAll(): Record<string, string> {
    if (typeof document === 'undefined') {
      return {};
    }

    try {
      const cookies: Record<string, string> = {};
      const cookieStrings = document.cookie.split(';');

      for (let cookie of cookieStrings) {
        cookie = cookie.trim();
        const [encodedName, ...valueParts] = cookie.split('=');
        
        if (encodedName && valueParts.length > 0) {
          const name = decodeURIComponent(encodedName);
          const value = decodeURIComponent(valueParts.join('='));
          
          // Remove prefix if it exists
          const finalName = this.config.prefix && name.startsWith(this.config.prefix)
            ? name.substring(this.config.prefix.length)
            : name;
            
          cookies[finalName] = value;
        }
      }

      return cookies;
    } catch (error) {
      console.error('CookieManager: Error getting all cookies', error);
      return {};
    }
  }

  // Clear all cookies (only those with the same prefix if configured)
  clear(options: Pick<CookieOptions, 'path' | 'domain'> = {}): void {
    const allCookies = this.getAll();
    
    Object.keys(allCookies).forEach(name => {
      this.remove(name, options);
    });
  }

  // Get cookie size in bytes
  getSize(name: string): number {
    const value = this.get(name);
    if (value === null) return 0;
    
    return new Blob([value]).size;
  }

  // Get total cookies size
  getTotalSize(): number {
    if (typeof document === 'undefined') return 0;
    
    return new Blob([document.cookie]).size;
  }

  // Check if cookies are enabled
  isEnabled(): boolean {
    if (typeof document === 'undefined') return false;
    
    try {
      const testCookie = '__cookie_test__';
      this.set(testCookie, 'test');
      const isEnabled = this.has(testCookie);
      this.remove(testCookie);
      return isEnabled;
    } catch {
      return false;
    }
  }
}

// Default cookie manager instance
export const cookieManager = new CookieManager();

// Utility functions for quick access
export const setCookie = (name: string, value: string, options?: CookieOptions): boolean => {
  return cookieManager.set(name, value, options);
};

export const getCookie = (name: string): string | null => {
  return cookieManager.get(name);
};

export const getCookieJSON = <T = any>(name: string): T | null => {
  return cookieManager.getJSON<T>(name);
};

export const setCookieJSON = (name: string, value: any, options?: CookieOptions): boolean => {
  return cookieManager.setJSON(name, value, options);
};

export const removeCookie = (name: string, options?: Pick<CookieOptions, 'path' | 'domain'>): boolean => {
  return cookieManager.remove(name, options);
};

export const hasCookie = (name: string): boolean => {
  return cookieManager.has(name);
};

export const getAllCookies = (): Record<string, string> => {
  return cookieManager.getAll();
};

export const clearAllCookies = (options?: Pick<CookieOptions, 'path' | 'domain'>): void => {
  return cookieManager.clear(options);
};

export const isCookiesEnabled = (): boolean => {
  return cookieManager.isEnabled();
};

// Create a custom cookie manager with specific configuration
export const createCookieManager = (config: CookieManagerConfig): CookieManager => {
  return new CookieManager(config);
};

