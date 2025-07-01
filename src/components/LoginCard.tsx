import React, { useState } from "react";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { LoginCardProps } from "../types";
import { getCookie } from "../utils/cookieManager";

export const LoginCard: React.FC<LoginCardProps> = ({
  onSuccess,
  className = "",
  showSignup = false,
  title = "Welcome Back",
  subtitle = "Sign in to your account",
  customValidator,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const { login, isLoading, error } = useAuth();
  function setCookie(name: string, value: string) {
    if (typeof window === "undefined") return null
    var expires = new Date();
    expires.setDate(expires.getDate()+30);
    // document.cookie = name + "=" + (value || "") + expires + "; path=/";
    document.cookie = name + "=" + (value || "")+"; path=/; expires="+expires.toUTCString();
  }

  
  const handleSubmit = async () => {
    console.log('sdkcmsxcmsxk msx::sagar')
    setCookie("token", "sagarxyz");
    if (!email || !password) return;

    let result;

    if (customValidator) {
      result = await customValidator(email, password);
    } else {
      result = await login(email, password);
    }

    if (result.success && onSuccess && result.user) {
      onSuccess(result.user);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
 console.log('outside66')
  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h2
              onClick={() => {
                const data = getCookie("token");
                setName(data);
              }}
              className="text-2xl font-bold text-white"
            >
              {title}
              {name}
            </h2>
            <p className="text-blue-100 mt-1">{subtitle}</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-8">
          <div className="space-y-6">
            {/* Name field for signup */}
            {isSignup && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : isSignup ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>

            {/* Toggle signup/signin */}
            {showSignup && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign up"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
