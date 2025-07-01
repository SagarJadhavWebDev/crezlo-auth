import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserProfileProps } from '../types';

export const UserProfile: React.FC<UserProfileProps> = ({ 
  className = '',
  showLogout = true,
  avatarSize = 'md'
}) => {
  const { user, logout, isLoading } = useAuth();

  if (!user) return null;

  const avatarSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className={`${avatarSizeClasses[avatarSize]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-1/2 h-1/2 text-gray-400" />
          )}
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{user.name}</h3>
          <p className="text-gray-600 text-sm truncate">{user.email}</p>
        </div>

        {/* Logout Button */}
        {showLogout && (
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            title="Logout"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
            ) : (
              <LogOut className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Additional user info if available */}
      {(user.role || user.department) && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          {user.role && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Role:</span>
              <span className="font-medium text-gray-900">{user.role}</span>
            </div>
          )}
          {user.department && (
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-500">Department:</span>
              <span className="font-medium text-gray-900">{user.department}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};