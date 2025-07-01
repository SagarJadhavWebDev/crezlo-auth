export interface AuthUser {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    [key: string]: any;
  }
  
  export interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<{ success: boolean; user?: AuthUser; error?: string }>;
    logout: () => void;
    isInitialized: boolean;
  }
  
  export interface LoginCardProps {
    onSuccess?: (user: AuthUser) => void;
    className?: string;
    showSignup?: boolean;
    title?: string;
    subtitle?: string;
    apiEndpoint?: string;
    customValidator?: (email: string, password: string) => Promise<{ success: boolean; user?: AuthUser; error?: string }>;
  }
  
  export interface UserProfileProps {
    className?: string;
    showLogout?: boolean;
    avatarSize?: 'sm' | 'md' | 'lg';
  }
  
  export interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    requireAuth?: boolean;
    loadingComponent?: React.ReactNode;
  }
  
  export interface AuthProviderProps {
    children: React.ReactNode;
    initialUser?: AuthUser | null;
    apiEndpoint?: string;
    storageKey?: string;
  }