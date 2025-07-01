// Main package entry point
import "./styles/style.css"
export { AuthProvider, useAuth } from './context/AuthContext';
export { LoginCard } from './components/LoginCard';
export { UserProfile } from './components/UserProfile';
export { AuthGuard } from './components/AuthGuard';

// Export types
export type { 
  AuthUser, 
  AuthContextType, 
  LoginCardProps,
  UserProfileProps,
  AuthGuardProps,
  AuthProviderProps
} from './types';