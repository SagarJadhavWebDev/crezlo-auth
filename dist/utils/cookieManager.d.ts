export interface CookieOptions {
    expires?: Date | number;
    maxAge?: number;
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
    prefix?: string;
}
export declare class CookieManager {
    private config;
    constructor(config?: CookieManagerConfig);
    set(name: string, value: string, options?: CookieOptions): boolean;
    get(name: string): string | null;
    getJSON<T = any>(name: string): T | null;
    setJSON(name: string, value: any, options?: CookieOptions): boolean;
    remove(name: string, options?: Pick<CookieOptions, 'path' | 'domain'>): boolean;
    has(name: string): boolean;
    getAll(): Record<string, string>;
    clear(options?: Pick<CookieOptions, 'path' | 'domain'>): void;
    getSize(name: string): number;
    getTotalSize(): number;
    isEnabled(): boolean;
}
export declare const cookieManager: CookieManager;
export declare const setCookie: (name: string, value: string, options?: CookieOptions) => boolean;
export declare const getCookie: (name: string) => string | null;
export declare const getCookieJSON: <T = any>(name: string) => T | null;
export declare const setCookieJSON: (name: string, value: any, options?: CookieOptions) => boolean;
export declare const removeCookie: (name: string, options?: Pick<CookieOptions, 'path' | 'domain'>) => boolean;
export declare const hasCookie: (name: string) => boolean;
export declare const getAllCookies: () => Record<string, string>;
export declare const clearAllCookies: (options?: Pick<CookieOptions, 'path' | 'domain'>) => void;
export declare const isCookiesEnabled: () => boolean;
export declare const createCookieManager: (config: CookieManagerConfig) => CookieManager;
